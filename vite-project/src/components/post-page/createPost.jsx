import PostField from "./postField";

function PostHeader() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-8 sm:px-6 lg:pb-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/80">
            Share something real
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Create a post
          </h2>
        </div>
        <span className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/60 sm:block">
          Your space, your voice
        </span>
      </div>

      <section className="overflow-hidden rounded-3xl border border-white/20 bg-black/30 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-amber-200/70 bg-white/10">
            <img
              src="/2d724bfa5d33868fa0d5673f9c221f10.jpg"
              alt="Ward"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-white">Ward</p>
            <p className="text-xs text-white/50">Posting to your followers</p>
          </div>
        </div>
        <PostField />
      </section>
    </main>
  );
}

export default PostHeader;
