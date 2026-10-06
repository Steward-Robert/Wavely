import "../../styles/index.css";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import UserContext from "../../context/UserContext.jsx";
import api from "../../services/api.js";

const getAvatar = (user) =>
  user?.avatar?.avatar ?? user?.avatars?.[0]?.avatar ?? "/pfp ideas 🌑.jpg";

function Stories({ alluser = [], refreshKey = 0 }) {
  const user = useContext(UserContext);
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const groupedStories = useMemo(() => {
    const groups = new Map();

    for (const story of stories) {
      const authorId = story.author?.id;
      if (!authorId) continue;
      if (!groups.has(authorId)) {
        const author =
          authorId === user?.id
            ? user
            : alluser.find((candidate) => candidate.id === authorId);
        groups.set(authorId, {
          id: authorId,
          name: story.author?.name || author?.name || "Unknown user",
          avatar: getAvatar(author),
          stories: [],
        });
      }
      groups.get(authorId).stories.push(story);
    }

    const users = [...groups.values()];
    const ownStoriesIndex = users.findIndex((group) => group.id === user?.id);
    if (ownStoriesIndex > 0) {
      users.unshift(users.splice(ownStoriesIndex, 1)[0]);
    }
    return users;
  }, [alluser, stories, user]);
  const currentUser = groupedStories[currentUserIndex];
  const currentStory = currentUser?.stories?.[currentStoryIndex];
  const ownStories = groupedStories.find((group) => group.id === user?.id);
  const viewerUsers = groupedStories;

  const openViewer = (userIndex) => {
    setCurrentUserIndex(userIndex);
    setCurrentStoryIndex(0);
    setIsViewerOpen(true);
  };

  const closeViewer = useCallback(() => setIsViewerOpen(false), []);

  const showNextStory = useCallback(() => {
    if (!currentUser) return;

    if (currentStoryIndex < currentUser.stories.length - 1) {
      setCurrentStoryIndex((index) => index + 1);
      return;
    }

    if (currentUserIndex < viewerUsers.length - 1) {
      setCurrentUserIndex((index) => index + 1);
      setCurrentStoryIndex(0);
      return;
    }

    closeViewer();
  }, [closeViewer, currentStoryIndex, currentUser, currentUserIndex, viewerUsers.length]);

  const showPreviousStory = useCallback(() => {
    if (!currentUser) return;

    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((index) => index - 1);
      return;
    }

    if (currentUserIndex > 0) {
      const previousUserIndex = currentUserIndex - 1;
      setCurrentUserIndex(previousUserIndex);
      setCurrentStoryIndex(viewerUsers[previousUserIndex].stories.length - 1);
      return;
    }

    closeViewer();
  }, [closeViewer, currentStoryIndex, currentUser, currentUserIndex, viewerUsers]);

  useEffect(() => {
    let isCurrent = true;
    const fetchStories = async () => {
      try {
        const response = await api.get("/story");
        if (isCurrent) {
          setStories(
            Array.isArray(response.data.stories) ? response.data.stories : [],
          );
        }
      } catch (requestError) {
        console.error("Error fetching stories:", requestError);
        if (isCurrent) {
          setError(
            requestError.response?.data?.message ||
              "Could not load stories. Please try again.",
          );
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    fetchStories();
    return () => {
      isCurrent = false;
    };
  }, [refreshKey]);

  const deleteStory = async (storyId) => {
    try {
      await api.delete(`/story/${encodeURIComponent(storyId)}`);
      const remaining = stories.filter((story) => story.id !== storyId);
      setStories(remaining);
      setIsViewerOpen(false);
    } catch (requestError) {
      console.error("Error deleting story:", requestError);
      setError(
        requestError.response?.data?.message ||
          "Could not delete this story. Please try again.",
      );
    }
  };

  const formatStoryDate = (date) =>
    date
      ? new Intl.DateTimeFormat(undefined, {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date(date))
      : "";

  useEffect(() => {
    if (!isViewerOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowRight") showNextStory();
      if (event.key === "ArrowLeft") showPreviousStory();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isViewerOpen,
    currentUserIndex,
    currentStoryIndex,
    closeViewer,
    showNextStory,
    showPreviousStory,
  ]);

  return (
    <>
      <section className="w-full overflow-hidden rounded-sm border border-white/10 bg-[#020406]/95 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.55)] backdrop-blur-xl backdrop-saturate-150 sm:p-5 sm:h-50 md:mx-auto md:w-xl md:p-2 sm:w-[88vh] sm:block sm:mx-auto lg:w-[45vw]">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-wide text-white drop-shadow-md">
            Stories
          </h2>
        </div>

        {error && (
          <p role="alert" className="mb-3 rounded-xl border border-rose-200/15 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </p>
        )}

        {/* Stories container */}
        <div
          className="story-scrollbar flex w-full gap-3 overflow-x-auto px-1 pb-2 sm:gap-4 sm:px-2"
          style={{ scrollbarColor: "rgba(255,255,255,0.4) transparent" }}
        >
          <div className="sticky left-0 z-50 shrink-0 bg-[#020406]/95 pl-3 pr-1 shadow-[-14px_0_24px_rgba(0,0,0,1)] ring-1 ring-white/5">
            <button
              type="button"
              onClick={() => {
                if (ownStories) {
                  openViewer(groupedStories.indexOf(ownStories));
                } else {
                  document.getElementById("share-sm")?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
              aria-label={ownStories ? "View My Story" : "Add to My Story"}
              className="group relative h-30 w-22 overflow-hidden rounded-2xl border border-white/30 bg-white/10 text-left shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20 sm:h-30 sm:w-25 sm:rounded- md:h- md:w-25 md:rounded-sm"
            >
              {ownStories?.stories[0]?.image?.match(/\.(mp4|webm|ogg)(\?|$)/i) ? (
                <video
                  src={ownStories.stories[0].image}
                  className="absolute inset-0 z-0 h-full w-full object-cover"
                  muted
                />
              ) : ownStories?.stories[0]?.image ? (
                <img
                  src={ownStories.stories[0].image}
                  alt=""
                  className="absolute inset-0 z-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/20 via-slate-900 to-amber-200/15" />
              )}
              <div className="absolute right-1.5 top-0.5 z-20 h-9 w-9 rounded-full border-2 border-white/50 bg-black/20 md:top-2 md:right-3 sm:top-3">
                <img
                  src={getAvatar(user)}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="absolute inset-0 z-10 bg-linear-to-t from-black/65 via-black/10 to-white/10" />
              <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-black/20 p-2 backdrop-blur-lg md:text-center md:overflow-auto sm:text-center">
                <h3 className="truncate text-center text-[11px] font-medium text-white drop-shadow-md">
                  My Story
                </h3>
              </div>
            </button>
          </div>

          {!isLoading && groupedStories.map((storyUser) => {
            if (storyUser.id === user?.id) return null;
            const firstStory = storyUser.stories[0];
            return (
            <button
              type="button"
              onClick={() =>
                openViewer(viewerUsers.findIndex((viewer) => viewer.id === storyUser.id))
              }
              key={storyUser.id}
              className="group relative h-30 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/30 bg-white/10 text-left shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20 sm:h-30 sm:w-25 sm:rounded- md:h- md:w-25 md:rounded-sm"
            >
              {firstStory?.image && (
                firstStory.image.match(/\.(mp4|webm|ogg)(\?|$)/i) ? (
                  <video src={firstStory.image} className="absolute inset-0 z-0 h-full w-full object-cover" muted />
                ) : (
                  <img src={firstStory.image} alt="" className="absolute inset-0 z-0 h-full w-full object-cover" />
                )
              )}
              <div className="absolute right-1.5 top-0.5 z-20 h-9 w-9 rounded-full border-2 border-white/50 bg-black/20 md:top-2 md:right-3 sm:top-3">
                <img
                  src={storyUser.avatar}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="absolute inset-0 z-10 bg-linear-to-t from-black/65 via-black/10 to-white/10" />
              <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-black/20 p-2 backdrop-blur-lg md:text-center md:overflow-auto sm:text-center">
                <h3 className="truncate text-[11px] font-medium text-white drop-shadow-md">
                  {storyUser.name}
                </h3>
              </div>
            </button>
          );})}
          {isLoading && (
            <p className="self-center px-3 text-sm text-slate-400">Loading stories...</p>
          )}
          {!isLoading && groupedStories.length === 0 && (
            <p className="self-center px-3 text-sm text-slate-400">No stories yet.</p>
          )}
        </div>
      </section>

      {isViewerOpen && currentStory && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeViewer}
        >
          <div
            className="relative flex h-full max-h-212.5 w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/20 bg-black shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-4 top-4 z-20 flex gap-1.5">
              {currentUser.stories.map((story, index) => (
                <div
                  key={story.id}
                  className="h-1 flex-1 overflow-hidden rounded-full bg-white/25"
                >
                  <div
                    className={`h-full rounded-full bg-white transition-all duration-300 ${index <= currentStoryIndex ? "w-full" : "w-0"}`}
                  />
                </div>
              ))}
            </div>

            <div className="absolute inset-x-4 top-10 z-20 flex items-center gap-3 text-white">
              <img
                src={currentUser.avatar || "/pfp ideas 🌑.jpg"}
                alt=""
                className="h-10 w-10 rounded-full border border-white/40 object-cover"
              />
              <span className="text-sm font-semibold drop-shadow-md">
                {currentUser.name}
              </span>
              <time className="text-xs text-white/70">
                {formatStoryDate(currentStory.createdAt)}
              </time>
              {currentUser.id === user?.id && (
                <button
                  type="button"
                  onClick={() => deleteStory(currentStory.id)}
                  aria-label="Delete this story"
                  className="rounded-full p-2 text-white transition hover:bg-rose-500/30"
                >
                  <X size={19} />
                </button>
              )}
              <button
                type="button"
                aria-label="Close story viewer"
                onClick={closeViewer}
                className="ml-auto rounded-full p-2 text-white transition hover:bg-white/15"
              >
                <X size={22} />
              </button>
            </div>

            {currentStory.image?.match(/\.(mp4|webm|ogg)(\?|$)/i) ? (
              <video src={currentStory.image} autoPlay controls playsInline className="h-full w-full object-contain" />
            ) : (
              <img
                src={currentStory.image}
                alt={`${currentUser.name} story`}
                className="h-full w-full object-contain"
              />
            )}
            {currentStory.content && (
              <p className="absolute inset-x-5 bottom-8 z-20 rounded-xl bg-black/45 px-4 py-3 text-center text-white backdrop-blur-md">
                {currentStory.content}
              </p>
            )}

            <button
              type="button"
              aria-label="Previous story"
              onClick={showPreviousStory}
              className="absolute inset-y-0 left-0 z-10 w-1/3 text-white/0 transition hover:bg-white/5 hover:text-white"
            >
              <ChevronLeft className="ml-3" size={30} />
            </button>
            <button
              type="button"
              aria-label="Next story"
              onClick={showNextStory}
              className="absolute inset-y-0 right-0 z-10 flex w-1/3 items-center justify-end text-white/0 transition hover:bg-white/5 hover:text-white"
            >
              <ChevronRight className="mr-3" size={30} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Stories;
