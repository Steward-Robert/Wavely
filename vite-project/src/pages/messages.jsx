import { io } from "socket.io-client";
import {
  ArrowUp,
  FileText,
  LoaderCircle,
  MessageCircle,
  Paperclip,
  X,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/header.jsx";
import LSidebar from "../components/sidebar/leftSidbar.jsx";
import UserContext from "../context/UserContext.jsx";
import api, { socketBaseUrl } from "../services/api.js";

const getAvatar = (user) =>
  user?.avatar?.avatar ?? "/pfp ideas 🌑.jpg";

const formatMessageTime = (date) =>
  new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));

const mergeMessage = (currentMessages, newMessage) => {
  if (currentMessages.some((message) => message.id === newMessage.id)) {
    return currentMessages;
  }
  return [...currentMessages, newMessage].sort(
    (first, second) =>
      new Date(first.createdAt).getTime() -
      new Date(second.createdAt).getTime(),
  );
};

function Messages() {
  const user = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [attachmentUrls, setAttachmentUrls] = useState({});
  const [attachmentErrors, setAttachmentErrors] = useState({});
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const formRef = useRef(null);
  const activeConversationId = useRef(null);
  const activeFriendId = useRef(null);
  const attachmentUrlsRef = useRef({});

  useEffect(() => {
    let isCurrent = true;
    const loadChatData = async () => {
      try {
        const [friendsResponse, conversationsResponse] = await Promise.all([
          api.get("/chat/friends"),
          api.get("/chat/conversations"),
        ]);
        if (!isCurrent) return;
        setFriends(friendsResponse.data.friends);
        setConversations(conversationsResponse.data.conversations);
        if (conversationsResponse.data.conversations.length > 0) {
          setIsLoadingMessages(true);
          setActiveConversation(conversationsResponse.data.conversations[0]);
        }
      } catch (requestError) {
        if (isCurrent) {
          setError(
            requestError.response?.data?.message ||
              "Could not load messages. Please try again.",
          );
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    loadChatData();
    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    activeConversationId.current = activeConversation?.id ?? null;
    activeFriendId.current = activeConversation?.friend?.id ?? null;
    if (!activeConversation) {
      return undefined;
    }

    let isCurrent = true;
    api
      .get(`/chat/conversations/${encodeURIComponent(activeConversation.id)}/messages`)
      .then((response) => {
        if (isCurrent) setMessages(response.data.messages);
      })
      .catch((requestError) => {
        if (isCurrent) {
          setError(
            requestError.response?.data?.message ||
              "Could not load this conversation.",
          );
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoadingMessages(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [activeConversation]);

  useEffect(() => {
    let isCurrent = true;
    const socket = io(socketBaseUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    const refreshChatData = async () => {
      try {
        const [friendsResponse, conversationsResponse] = await Promise.all([
          api.get("/chat/friends"),
          api.get("/chat/conversations"),
        ]);
        if (!isCurrent) return;
        const latestConversations = conversationsResponse.data.conversations;
        setFriends(friendsResponse.data.friends);
        setConversations(latestConversations);

        const currentId = activeConversationId.current;
        if (!currentId) return;
        const currentConversation = latestConversations.find(
          (conversation) => conversation.id === currentId,
        );
        if (!currentConversation) {
          activeConversationId.current = null;
          activeFriendId.current = null;
          setActiveConversation(null);
          setMessages([]);
          setError("This conversation is unavailable because you are no longer friends.");
          return;
        }

        const messagesResponse = await api.get(
          `/chat/conversations/${encodeURIComponent(currentId)}/messages`,
        );
        if (isCurrent && activeConversationId.current === currentId) {
          setMessages(messagesResponse.data.messages);
        }
      } catch (requestError) {
        if (isCurrent) {
          console.error("Could not synchronize chat after reconnect:", requestError);
        }
      }
    };

    socket.on("connect", () => {
      setSocketConnected(true);
      void refreshChatData();
    });
    socket.on("disconnect", () => setSocketConnected(false));
    socket.on("connect_error", (socketError) => {
      setSocketConnected(false);
      console.error("Chat connection failed:", socketError);
    });
    socket.on("chat:message", (newMessage) => {
      setConversations((current) => {
        const updated = current.map((conversation) =>
          conversation.id === newMessage.conversationId
            ? {
                ...conversation,
                updatedAt: newMessage.createdAt,
                lastMessage: newMessage,
              }
            : conversation,
        );
        return updated.sort(
          (first, second) =>
            new Date(second.updatedAt).getTime() -
            new Date(first.updatedAt).getTime(),
        );
      });
      if (activeConversationId.current === newMessage.conversationId) {
        setMessages((current) => mergeMessage(current, newMessage));
      }
      api
        .get("/chat/conversations")
        .then((response) => {
          if (isCurrent) setConversations(response.data.conversations);
        })
        .catch((requestError) => {
          if (isCurrent) {
            console.error("Could not refresh chat list:", requestError);
          }
        });
    });
    socket.on("chat:friendship-removed", ({ friendId, userId: removedUserId }) => {
      const peerId = removedUserId === user?.id ? friendId : removedUserId;
      setFriends((current) => current.filter((friend) => friend.id !== peerId));
      setConversations((current) =>
        current.filter((conversation) => conversation.friend.id !== peerId),
      );
      if (activeFriendId.current === peerId) {
        activeConversationId.current = null;
        activeFriendId.current = null;
        setActiveConversation(null);
        setMessages([]);
        setError("This conversation is unavailable because you are no longer friends.");
      }
    });

    return () => {
      isCurrent = false;
      socket.disconnect();
    };
  }, [user?.id]);

  useEffect(() => {
    const pending = messages.filter(
      (message) => message.attachment && !attachmentUrlsRef.current[message.id],
    );
    if (pending.length === 0) return undefined;

    let isCurrent = true;
    pending.forEach((message) => {
      api
        .get(`/chat/messages/${encodeURIComponent(message.id)}/media`, {
          responseType: "blob",
        })
        .then((response) => {
          const objectUrl = URL.createObjectURL(response.data);
          if (!isCurrent) {
            URL.revokeObjectURL(objectUrl);
            return;
          }
          attachmentUrlsRef.current[message.id] = objectUrl;
          setAttachmentUrls((current) => ({
            ...current,
            [message.id]: objectUrl,
          }));
        })
        .catch((requestError) => {
          if (!isCurrent) return;
          console.error("Could not load chat attachment:", requestError);
          setAttachmentErrors((current) => ({
            ...current,
            [message.id]: "Attachment unavailable.",
          }));
        });
    });

    return () => {
      isCurrent = false;
    };
  }, [messages]);

  useEffect(
    () => () => {
      Object.values(attachmentUrlsRef.current).forEach((url) =>
        URL.revokeObjectURL(url),
      );
    },
    [],
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeConversation?.id]);

  const startConversation = async (friend) => {
    setError("");
    try {
      const response = await api.post("/chat/conversations", {
        friendId: friend.id,
      });
      const conversation = response.data.conversation;
      activeConversationId.current = conversation.id;
      activeFriendId.current = conversation.friend.id;
      setIsLoadingMessages(true);
      setMessages([]);
      setContent("");
      setSelectedFile(null);
      formRef.current?.reset();
      setActiveConversation(conversation);
      setConversations((current) => {
        const withoutCurrent = current.filter(
          (item) => item.id !== conversation.id,
        );
        return [conversation, ...withoutCurrent];
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not start this conversation.",
      );
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!activeConversation || (!content.trim() && !selectedFile)) return;

    setIsSending(true);
    setError("");
    const formData = new FormData();
    if (content.trim()) formData.append("content", content.trim());
    if (selectedFile) formData.append("attachment", selectedFile);

    try {
      const response = await api.post(
        `/chat/conversations/${encodeURIComponent(activeConversation.id)}/messages`,
        formData,
      );
      const sentMessage = response.data.message;
      setMessages((current) => mergeMessage(current, sentMessage));
      setConversations((current) =>
        current
          .map((conversation) =>
            conversation.id === sentMessage.conversationId
              ? {
                  ...conversation,
                  updatedAt: sentMessage.createdAt,
                  lastMessage: sentMessage,
                }
              : conversation,
          )
          .sort(
            (first, second) =>
              new Date(second.updatedAt).getTime() -
              new Date(first.updatedAt).getTime(),
          ),
      );
      setContent("");
      setSelectedFile(null);
      formRef.current?.reset();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not send this message. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white">
      <Header />
      <LSidebar />
      <main className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl px-3 py-4 md:pl-24 lg:pl-64">
        <section className="flex min-h-[calc(100dvh-6rem)] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#05070b]/90 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
          <aside className="flex w-[38%] min-w-32 max-w-sm flex-col border-r border-white/10 sm:w-72">
            <div className="border-b border-white/10 p-4">
              <h1 className="text-xl font-semibold">Messages</h1>
              <p className="mt-1 text-xs text-slate-400">
                Private conversations with accepted friends
              </p>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              {isLoading ? (
                <p className="p-4 text-sm text-slate-400">Loading chats...</p>
              ) : (
                <>
                  {conversations.map((conversation) => (
                    <button
                      type="button"
                      key={conversation.id}
                      onClick={() => {
                        if (activeConversation?.id === conversation.id) return;
                        setError("");
                        activeConversationId.current = conversation.id;
                        activeFriendId.current = conversation.friend.id;
                        setIsLoadingMessages(true);
                        setMessages([]);
                        setContent("");
                        setSelectedFile(null);
                        formRef.current?.reset();
                        setActiveConversation(conversation);
                      }}
                      aria-current={
                        activeConversation?.id === conversation.id
                          ? "true"
                          : undefined
                      }
                      className={`flex w-full items-center gap-3 border-b border-white/5 px-3 py-3 text-left transition hover:bg-white/5 sm:px-4 ${
                        activeConversation?.id === conversation.id
                          ? "bg-cyan-300/10"
                          : ""
                      }`}
                    >
                      <img
                        src={getAvatar(conversation.friend)}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {conversation.friend.name}
                        </span>
                        <span className="block truncate text-xs text-slate-400">
                          {conversation.lastMessage?.content ||
                            conversation.lastMessage?.attachmentName ||
                            "Start a conversation"}
                        </span>
                      </span>
                    </button>
                  ))}
                  {friends.length > 0 && (
                    <div className="border-t border-white/10 p-3">
                      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Start a chat
                      </h2>
                      {friends
                        .filter(
                          (friend) =>
                            !conversations.some(
                              (conversation) =>
                                conversation.friend.id === friend.id,
                            ),
                        )
                        .map((friend) => (
                          <button
                            type="button"
                            key={friend.id}
                            onClick={() => startConversation(friend)}
                            className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-white/5"
                          >
                            <img
                              src={getAvatar(friend)}
                              alt=""
                              className="h-9 w-9 rounded-full object-cover"
                            />
                            <span className="truncate text-sm">{friend.name}</span>
                          </button>
                        ))}
                    </div>
                  )}
                  {conversations.length === 0 && friends.length === 0 && (
                    <p className="p-4 text-sm text-slate-400">
                      Add an accepted friend to start messaging.
                    </p>
                  )}
                </>
              )}
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            {activeConversation ? (
              <>
                <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                  <img
                    src={getAvatar(activeConversation.friend)}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-medium">
                      {activeConversation.friend.name}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {socketConnected ? "Connected" : "Reconnecting..."}
                    </p>
                  </div>
                  <MessageCircle
                    aria-hidden="true"
                    className="text-cyan-100/70"
                    size={20}
                  />
                </header>

                {error && (
                  <p
                    role="alert"
                    className="mx-4 mt-3 rounded-lg border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-100"
                  >
                    {error}
                  </p>
                )}
                <div
                  aria-live="polite"
                  className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4"
                >
                  {isLoadingMessages ? (
                    <div className="flex flex-1 items-center justify-center text-slate-400">
                      <LoaderCircle className="animate-spin" size={22} />
                      <span className="sr-only">Loading messages</span>
                    </div>
                  ) : messages.length === 0 ? (
                    <p className="m-auto text-center text-sm text-slate-400">
                      No messages yet. Say hello.
                    </p>
                  ) : (
                    messages.map((message) => (
                      <article
                        key={message.id}
                        className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                          message.sender.id === user?.id
                            ? "ml-auto bg-cyan-300/15"
                            : "mr-auto bg-white/8"
                        }`}
                      >
                        {message.content && (
                          <p className="whitespace-pre-wrap break-words text-sm">
                            {message.content}
                          </p>
                        )}
                        {message.attachment && (
                          <div className="mt-2">
                            {attachmentErrors[message.id] ? (
                              <p role="alert" className="text-xs text-rose-200">
                                {attachmentErrors[message.id]}
                              </p>
                            ) : attachmentUrls[message.id] ? (
                              message.attachment.mimeType.startsWith("image/") ? (
                                <img
                                  src={attachmentUrls[message.id]}
                                  alt={message.attachment.name}
                                  className="max-h-72 max-w-full rounded-lg object-contain"
                                />
                              ) : message.attachment.mimeType.startsWith("video/") ? (
                                <video
                                  src={attachmentUrls[message.id]}
                                  controls
                                  playsInline
                                  className="max-h-72 max-w-full rounded-lg"
                                />
                              ) : (
                                <a
                                  href={attachmentUrls[message.id]}
                                  download={message.attachment.name}
                                  className="flex items-center gap-2 rounded-lg bg-black/20 px-3 py-2 text-sm text-cyan-100 underline"
                                >
                                  <FileText size={17} />
                                  <span className="max-w-48 truncate">
                                    {message.attachment.name}
                                  </span>
                                </a>
                              )
                            ) : (
                              <p role="status" className="text-xs text-slate-400">
                                Loading attachment...
                              </p>
                            )}
                          </div>
                        )}
                        <time className="mt-1 block text-right text-[10px] text-slate-400">
                          {formatMessageTime(message.createdAt)}
                        </time>
                      </article>
                    ))
                  )}
                  <div ref={bottomRef} />
                </div>

                {selectedFile && (
                  <div className="mx-4 mb-2 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                    <Paperclip size={15} className="shrink-0 text-cyan-100" />
                    <span className="min-w-0 flex-1 truncate">
                      {selectedFile.name}
                    </span>
                    <button
                      type="button"
                      aria-label="Remove attachment"
                      onClick={() => setSelectedFile(null)}
                      className="rounded p-1 text-slate-300 hover:bg-white/10"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <form
                  ref={formRef}
                  onSubmit={sendMessage}
                  className="flex items-end gap-2 border-t border-white/10 p-3"
                >
                  <label className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white">
                    <Paperclip size={19} />
                    <span className="sr-only">Attach an image, video, or PDF</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,application/pdf"
                      className="sr-only"
                      onChange={(event) =>
                        setSelectedFile(event.target.files?.[0] ?? null)
                      }
                    />
                  </label>
                  <textarea
                    aria-label="Write a message"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    maxLength={2000}
                    rows={1}
                    placeholder="Write a message..."
                    className="max-h-28 min-h-10 min-w-0 flex-1 resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-200/40"
                  />
                  <button
                    type="submit"
                    disabled={isSending || (!content.trim() && !selectedFile)}
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-200 text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isSending ? (
                      <LoaderCircle className="animate-spin" size={18} />
                    ) : (
                      <ArrowUp size={19} />
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center text-slate-400">
                <MessageCircle size={34} />
                <p>Select a conversation or choose a friend to start chatting.</p>
                {error && (
                  <p role="alert" className="text-sm text-rose-200">
                    {error}
                  </p>
                )}
                {!socketConnected && !isLoading && (
                  <p role="status" className="text-xs">
                    Reconnecting to chat...
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Messages;
