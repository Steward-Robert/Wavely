import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PostMediaCarousel({
  mediaItems = [],
  className = "",
  mediaClassName = "max-h-[600px] w-full object-contain",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);

  if (mediaItems.length === 0) return null;

  const currentIndex = Math.min(activeIndex, mediaItems.length - 1);
  const media = mediaItems[currentIndex];
  const moveBy = (offset) => {
    setActiveIndex((index) =>
      Math.max(0, Math.min(mediaItems.length - 1, index + offset)),
    );
  };
  const showVideoPreview = (event) => {
    const preview = event.currentTarget;
    if (Number.isFinite(preview.duration) && preview.duration > 0) {
      preview.currentTime = Math.min(0.5, preview.duration / 2);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-black/20 ${className}`}
      aria-label={`Post media, item ${currentIndex + 1} of ${mediaItems.length}`}
      aria-roledescription="carousel"
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const endX = event.changedTouches[0]?.clientX;
        const startX = touchStartX.current;
        touchStartX.current = null;
        if (startX === null || endX === undefined) return;

        const distance = startX - endX;
        if (Math.abs(distance) > 40) moveBy(distance > 0 ? 1 : -1);
      }}
      role="group"
    >
      <div
        key={media.id ?? media.url}
        className="post-media-enter w-full"
      >
        {media.mediaType === "video" ? (
          <video
            src={media.url}
            controls
            playsInline
            preload="metadata"
            onLoadedMetadata={showVideoPreview}
            className={mediaClassName}
          />
        ) : (
          <img
            src={media.url}
            alt="Post attachment"
            loading="lazy"
            className={mediaClassName}
          />
        )}
      </div>

      {mediaItems.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => moveBy(-1)}
            disabled={currentIndex === 0}
            aria-label="Show previous attachment"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft aria-hidden="true" size={22} />
          </button>
          <button
            type="button"
            onClick={() => moveBy(1)}
            disabled={currentIndex === mediaItems.length - 1}
            aria-label="Show next attachment"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight aria-hidden="true" size={22} />
          </button>
          <span className="absolute bottom-3 right-3 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
            {currentIndex + 1} / {mediaItems.length}
          </span>
        </>
      )}
    </div>
  );
}

export default PostMediaCarousel;
