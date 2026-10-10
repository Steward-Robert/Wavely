import { useEffect, useState } from "react";
import api from "../../services/api";
import { Send, Trash2, X } from "lucide-react";
import { Link } from "react-router";

const commentApiUrl = "/comment";

function getInitials(name) {
  return (
    name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

function getAvatarUrl(avatar) {
  if (typeof avatar === "string") return avatar;
  if (!avatar) return "";
  if (Array.isArray(avatar)) {
    return [...avatar].reverse().map(getAvatarUrl).find(Boolean) || "";
  }
  return getAvatarUrl(avatar?.avatar);
}

function CommentItem({
  comment,
  currentUser,
  users,
  onDelete,
  isDeleting,
  isSubmitting,
}) {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const isCurrentUser = comment.authorId === currentUser?.id;
  const commentAuthor = users.find(
    (candidate) => candidate.id === comment.authorId,
  );
  const username =
    comment.authorName ||
    comment.author?.name ||
    commentAuthor?.name ||
    (isCurrentUser ? currentUser?.name : "") ||
    "Wavely user";
  const avatarUrl =
    getAvatarUrl(comment.author?.avatar) ||
    getAvatarUrl(comment.author?.avatars) ||
    getAvatarUrl(commentAuthor?.avatar) ||
    getAvatarUrl(commentAuthor?.avatars) ||
    (isCurrentUser
      ? getAvatarUrl(currentUser?.avatar) || getAvatarUrl(currentUser?.avatars)
      : "");
  const avatarContent = (
    <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-300/20 to-blue-800/40 text-xs font-semibold text-cyan-100 sm:h-10 sm:w-10">
      {avatarUrl && !avatarFailed ? (
        <img
          src={avatarUrl}
          alt=""
          onError={() => setAvatarFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        getInitials(username)
      )}
    </div>
  );
  const avatar = comment.authorId ? (
    <Link
      to={`/user/${encodeURIComponent(comment.authorId)}`}
      aria-label={`View ${username}'s profile`}
      className="shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      {avatarContent}
    </Link>
  ) : (
    <div aria-hidden="true">{avatarContent}</div>
  );

  return (
    <li
      className={`flex w-full min-w-0 items-end gap-2 ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isCurrentUser && avatar}
      <article
        className={`min-w-0 max-w-[82%] rounded-2xl px-2.5 py-1.5 sm:max-w-[75%] ${
          isCurrentUser
            ? "rounded-br-md border border-cyan-300/20 bg-cyan-950/50 text-cyan-50"
            : "rounded-bl-md border border-white/[0.08] bg-zinc-950/90 text-white"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-cyan-200">
            {username}
          </p>
          {isCurrentUser && (
            <button
              type="button"
              onClick={() => onDelete(comment)}
              disabled={isDeleting || isSubmitting}
              aria-label={`Delete your comment by ${username}`}
              title={isDeleting ? "Deleting comment" : "Delete comment"}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/55 transition-colors hover:bg-white/5 hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-wait disabled:opacity-50"
            >
              <Trash2
                aria-hidden="true"
                size={14}
                className={isDeleting ? "animate-pulse" : ""}
              />
            </button>
          )}
        </div>
        <p className="break-words text-sm leading-snug [overflow-wrap:anywhere]">
          {comment.content}
        </p>
      </article>
      {isCurrentUser && avatar}
    </li>
  );
}

function Comment({ postId, user, users = [], onCommentCountChange, onClose }) {
  const [comments, setComments] = useState([]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadComments() {
      setIsLoading(true);
      setLoadError("");

      try {
        const response = await api.get(commentApiUrl, {
          withCredentials: true,
          signal: controller.signal,
        });

        if (!Array.isArray(response.data?.allComm)) {
          throw new Error(
            "The comments response was not in the expected format.",
          );
        }

        const postComments = response.data.allComm.filter(
          (comment) => comment.postId === postId,
        );
        setComments(postComments);
        onCommentCountChange?.(postId, postComments.length);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Error loading comments:", error);
        setLoadError(
          error.response?.data?.message ||
            "Couldn't load comments. Please try again later.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadComments();
    return () => controller.abort();
  }, [postId, onCommentCountChange]);

  async function handleSubmit(event) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || isSubmitting || deletingCommentId) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await api.post(
        `${commentApiUrl}/${encodeURIComponent(postId)}`,
        { content },
        { withCredentials: true },
      );

      if (!response.data?.id || response.data.postId !== postId) {
        throw new Error(
          "The server response did not contain the created comment.",
        );
      }

      const nextComments = [...comments, response.data];
      setComments(nextComments);
      onCommentCountChange?.(postId, nextComments.length);
      setDraft("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      setSubmitError(
        error.response?.data?.message ||
          "Couldn't post your comment. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(comment) {
    if (deletingCommentId || isSubmitting) return;

    setDeletingCommentId(comment.id);
    setDeleteError("");
    try {
      await api.delete(`${commentApiUrl}/${encodeURIComponent(comment.id)}`, {
        withCredentials: true,
      });

      const nextComments = comments.filter(
        (currentComment) => currentComment.id !== comment.id,
      );
      setComments(nextComments);
      onCommentCountChange?.(postId, nextComments.length);
    } catch (error) {
      console.error("Error deleting comment:", error);
      setDeleteError(
        error.response?.data?.message ||
          "Couldn't delete your comment. Please try again.",
      );
    } finally {
      setDeletingCommentId(null);
    }
  }

  return (
    <section
      aria-labelledby="comments-heading"
      className="fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[85dvh] max-h-[56rem] min-h-[20rem] w-[98vw] flex-col overflow-hidden rounded-t-3xl border border-cyan-500/30 bg-black shadow-[0_-16px_50px_rgba(0,0,0,0.55)] sm:h-[82dvh] sm:w-[98vw] md:h-[80dvh] md:w-[70vw] lg:h-[78dvh] lg:w-[45vw] xl:h-[76dvh]"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 pb-3 pt-4 sm:px-5">
        <div>
          <h2
            id="comments-heading"
            className="text-lg font-semibold tracking-wide text-cyan-100 sm:text-xl"
          >
            Comments
          </h2>
          <p className="mt-0.5 text-xs text-white/50">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </p>
        </div>
        <button
          type="button"
          aria-label="Close comments"
          onClick={onClose}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <X aria-hidden="true" size={20} />
        </button>
      </header>

      <ol
        aria-label="Comments"
        aria-live="polite"
        className="no-scrollbar flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-3 py-4 sm:px-5"
      >
        {isLoading ? (
          <li className="py-6 text-center text-sm text-white/55" role="status">
            Loading comments…
          </li>
        ) : loadError ? (
          <li className="py-6 text-center text-sm text-rose-200" role="alert">
            {loadError}
          </li>
        ) : comments.length === 0 ? (
          <li className="py-10 text-center text-sm text-white/50">
            No comments yet. Start the conversation.
          </li>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUser={user}
              users={users}
              onDelete={handleDelete}
              isDeleting={deletingCommentId === comment.id}
              isSubmitting={isSubmitting}
            />
          ))
        )}
      </ol>

      <div className="shrink-0 border-t border-cyan-500/20 bg-black px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5">
        {deleteError && (
          <p className="mb-2 text-sm text-rose-200" role="alert">
            {deleteError}
          </p>
        )}
        {submitError && (
          <p className="mb-2 text-sm text-rose-200" role="alert">
            {submitError}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex min-w-0 items-center gap-2"
        >
          <label className="sr-only" htmlFor="comment-input">
            Write a comment
          </label>
          <input
            id="comment-input"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write a comment..."
            autoComplete="off"
            className="h-11 min-w-0 flex-1 rounded-full border border-white/10 bg-zinc-950 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
          />
          <button
            type="submit"
            aria-label="Send comment"
            disabled={
              !draft.trim() || isSubmitting || Boolean(deletingCommentId)
            }
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cyan-300 text-black transition-colors hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send aria-hidden="true" size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Comment;
