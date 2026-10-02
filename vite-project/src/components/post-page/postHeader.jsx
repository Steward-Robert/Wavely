import PostField from "./postField";

function PostHeader({ user }) {
  return (
    <div className="mx-auto mt-8 mb-20 w-[min(90vw,760px)] overflow-hidden rounded-3xl border border-white/10 bg-[#05070b]/90 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 lg:w-[55vw] lg:block lg:mx-auto bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)]">
      <div className="border-b border-white/10 px-7 pb-5 pt-7 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-100/70">
          Share a moment
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Create a post
        </h1>
      </div>

      <div className="flex items-center gap-4 px-7 py-6 text-white">
        <div className="h-14 w-14  cursor-pointer rounded-full border border-cyan-200/30 p-0.5 shadow-[0_0_18px_rgba(103,232,249,0.1)]">
          <img
            src={user?.avatars?.at(-1)?.avatar ?? "/pfp ideas 🌑.jpg"}
            className="h-full w-full rounded-full object-cover"
            alt="Robert Steward"
          />
        </div>

        <div>
          <p className="text-sm text-white/45">Posting as</p>
          <p className="text-lg font-medium">{user.name}</p>
        </div>
      </div>
      <PostField />
    </div>
  );
}

export default PostHeader;
