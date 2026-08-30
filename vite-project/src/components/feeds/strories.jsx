import "../../styles/index.css";
import stories from "../../data/stories";

function Stories() {
  return (
    <section className="mx-2 mt-10 w-auto overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] p-2 shadow-2xl shadow-black/20 backdrop-blur-xs backdrop-saturate-150 sm:p-5 sm:h-50 md:mx-auto md:w-xl md:p-2 sm:w-[88vh] sm:block sm:mx-auto">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-wide text-white drop-shadow-md">
          Stories
        </h2>
      </div>

      {/* Stories container */}
      <div className="no-scrollbar flex w-full gap-3 overflow-x-auto px-1 pb-1 sm:gap-4 sm:px-2">
        {stories.map((story) => (
          <div
            key={story.id}
            className="group relative h-30 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1  hover:bg-white/20 sm:h-30 sm:w-25 sm:rounded- md:h- md:w-25 md:rounded-sm"
          >
            {/* Image principale */}
            <img
              src={story.img}
              className="absolute inset-0 z-0 h-full w-full object-cover transition duration-500 group-hover:scale-100"
            />

            {/* Photo de profil */}
            <div className="absolute right-1.5 top-0.5 z-20 h-9 w-9 rounded-full border-2 border-white/50 bg-black/20 md:top-2 md:right-3 sm:top-3">
              <img
                src={story.img}
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            {/* Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-black/10 to-white/10" />

            {/* Nom */}
            <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-black/20 p-2 backdrop-blur-lg md:text-center md:overflow-auto sm:text-center">
              <h3 className="truncate text-[11px] font-medium text-white drop-shadow-md">
                {story.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stories;
