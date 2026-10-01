import "../../styles/index.css";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import stories, { myStories } from "../../data/stories";

const myStoryUser = {
  id: "my-story",
  name: "My story",
  avatar: "0d75a22d7631a18a312d136e5f199b66.jpg",
  stories: myStories,
};
const storyUsers = [myStoryUser, ...stories];

function Stories() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const currentUser = storyUsers[currentUserIndex];
  const currentStory = currentUser?.stories?.[currentStoryIndex];

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

    if (currentUserIndex < storyUsers.length - 1) {
      setCurrentUserIndex((index) => index + 1);
      setCurrentStoryIndex(0);
      return;
    }

    closeViewer();
  }, [closeViewer, currentStoryIndex, currentUser, currentUserIndex]);

  const showPreviousStory = useCallback(() => {
    if (!currentUser) return;

    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((index) => index - 1);
      return;
    }

    if (currentUserIndex > 0) {
      const previousUserIndex = currentUserIndex - 1;
      setCurrentUserIndex(previousUserIndex);
      setCurrentStoryIndex(storyUsers[previousUserIndex].stories.length - 1);
      return;
    }

    setCurrentUserIndex(0);
    setCurrentStoryIndex(storyUsers[0].stories.length - 1);
  }, [currentStoryIndex, currentUser, currentUserIndex]);

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

        {/* Stories container */}
        <div
          className="story-scrollbar flex w-full gap-3 overflow-x-auto px-1 pb-2 sm:gap-4 sm:px-2"
          style={{ scrollbarColor: "rgba(255,255,255,0.4) transparent" }}
        >
          <div className="sticky left-0 z-50 shrink-0 bg-[#020406]/95 pl-3 pr-1 shadow-[-14px_0_24px_rgba(0,0,0,1)] ring-1 ring-white/5">
            <button
              type="button"
              onClick={() => openViewer(0)}
              className="group relative h-30 w-22 overflow-hidden rounded-2xl border border-white/30 bg-white/10 text-left shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20 sm:h-30 sm:w-25 sm:rounded- md:h- md:w-25 md:rounded-sm"
            >
              {/* Image principale */}
              <img
                src="1787604938678.png"
                className="absolute inset-0 z-0 h-full w-full object-cover transition duration-500 group-hover:scale-100"
              />

              {/* Photo de profil */}
              <div className="absolute right-1.5 top-0.5 z-20 h-9 w-9 rounded-full border-2 border-white/50 bg-black/20 md:top-2 md:right-3 sm:top-3">
                <img
                  src="0d75a22d7631a18a312d136e5f199b66.jpg"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              {/* Gradient */}
              <div className="absolute inset-0 z-10 bg-linear-to-t from-black/65 via-black/10 to-white/10" />

              {/* Nom */}
              <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-black/20 p-2 backdrop-blur-lg md:text-center md:overflow-auto sm:text-center">
                <h3 className="truncate text-[11px] font-medium text-white drop-shadow-md text-center">
                  My story
                </h3>
              </div>
            </button>
          </div>

          {stories.map((story, index) => (
            <button
              type="button"
              onClick={() => openViewer(index + 1)}
              key={story.id}
              className="group relative h-30 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/30 bg-white/10 text-left shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20 sm:h-30 sm:w-25 sm:rounded- md:h- md:w-25 md:rounded-sm"
            >
              {/* Image principale */}
              <img
                src={story.stories?.[0]?.img}
                className="absolute inset-0 z-0 h-full w-full object-cover transition duration-500 group-hover:scale-100"
              />

              {/* Photo de profil */}
              <div className="absolute right-1.5 top-0.5 z-20 h-9 w-9 rounded-full border-2 border-white/50 bg-black/20 md:top-2 md:right-3 sm:top-3">
                <img
                  src={story.avatar || story.stories?.[0]?.img}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              {/* Gradient */}
              <div className="absolute inset-0 z-10 bg-linear-to-t from-black/65 via-black/10 to-white/10" />

              {/* Nom */}
              <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-black/20 p-2 backdrop-blur-lg md:text-center md:overflow-auto sm:text-center">
                <h3 className="truncate text-[11px] font-medium text-white drop-shadow-md">
                  {story.name}
                </h3>
              </div>
            </button>
          ))}
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
                src={currentUser.avatar || currentStory.img}
                alt=""
                className="h-10 w-10 rounded-full border border-white/40 object-cover"
              />
              <span className="text-sm font-semibold drop-shadow-md">
                {currentUser.name}
              </span>
              <button
                type="button"
                aria-label="Close story viewer"
                onClick={closeViewer}
                className="ml-auto rounded-full p-2 text-white transition hover:bg-white/15"
              >
                <X size={22} />
              </button>
            </div>

            <img
              src={currentStory.img}
              alt={`${currentUser.name} story`}
              className="h-full w-full object-contain"
            />

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
