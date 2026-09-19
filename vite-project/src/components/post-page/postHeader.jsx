import PostField from "./postField";

function PostHeader() {
  return (
    <div className="mx-auto mt-8 mb-20 w-[min(90vw,760px)] overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:w-[55vw] lg:block lg:mx-auto">
      <div className="border-b border-white/10 px-7 pb-5 pt-7 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-100/70">
          Share a moment
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Create a post
        </h1>
      </div>

      <div className="flex items-center gap-4 px-7 py-6 text-white">
        <div className="h-14 w-14 overflow-hidden rounded-full border border-white/30 bg-white/10 p-1">
          <img
            src="2f6b33af4d5a2ee1ced2163055ad9597.jpg"
            className="h-full w-full rounded-full object-cover"
            alt="Robert Steward"
          />
        </div>

        <div>
          <p className="text-sm text-white/45">Posting as</p>
          <p className="text-lg font-medium">Robert Steward</p>
        </div>
      </div>
      <PostField />
    </div>
  );
}

export default PostHeader;
