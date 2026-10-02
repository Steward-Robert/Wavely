import { Heart, Bookmark, MessageCircle } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import VerifiedBadge from "../VerifiedBadge.jsx";
import FriendB from "../button/friendButton.jsx";

function Foryou() {
  const [allPost, setAllPost] = useState([]);
  const [likePending, setLikePending] = useState({});
  const [likeError, setLikeError] = useState("");

  const showVideoPreview = (event) => {
    const preview = event.currentTarget;
    if (Number.isFinite(preview.duration) && preview.duration > 0) {
      preview.currentTime = Math.min(0.5, preview.duration / 2);
    }
  };

  const handleLike = async (post) => {
    if (likePending[post.id]) return;

    const likedByUser = Boolean(post.likedByUser);
    const url = `https://wavely-backend-7ryc.onrender.com/api/like/${encodeURIComponent(post.id)}`;
    setLikePending((current) => ({ ...current, [post.id]: true }));
    setLikeError("");

    try {
      if (likedByUser) {
        await axios.delete(url, { withCredentials: true });
      } else {
        await axios.post(url, {}, { withCredentials: true });
      }

      setAllPost((currentPosts) =>
        currentPosts.map((currentPost) =>
          currentPost.id === post.id
            ? {
                ...currentPost,
                likedByUser: !likedByUser,
                _count: {
                  ...currentPost._count,
                  likes: Math.max(
                    0,
                    (currentPost._count?.likes ?? 0) + (likedByUser ? -1 : 1),
                  ),
                },
              }
            : currentPost,
        ),
      );
    } catch (error) {
      console.error("Error updating post like:", error);
      setLikeError("Could not update your like. Please try again.");
    } finally {
      setLikePending((current) => ({ ...current, [post.id]: false }));
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://wavely-backend-7ryc.onrender.com/api/post",
          {
            withCredentials: true,
          },
        );

        console.log("Posts:", response.data.posts);

        setAllPost(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {likeError && (
        <p
          role="alert"
          className="mx-auto my-3 w-[98vw] text-sm text-rose-200 md:w-[70vw] lg:w-[45vw]"
        >
          {likeError}
        </p>
      )}
      {allPost.map((post) => {
        const avatarUrl = post.author?.avatar?.avatar ?? "/pfp ideas 🌑.jpg";

        return (
          <main
            key={post.id}
            className="mx-auto my-3 block h-auto w-[98vw] sm:mx-auto sm:block md:mx-auto md:block md:w-[70vw] lg:w-[45vw]"
          >
            <article className="overflow-hidden rounded-[28px] border border-white/10 bg-[#05070b]/90 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150">
              {/* HEADER */}
              <header className="flex items-center justify-between gap-4 text-amber-50">
                <div className="flex gap-2">
                  {/* AVATAR */}
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-full border border-white/15 bg-white/10 shadow-lg shadow-black/20">
                    <img
                      src={avatarUrl}
                      alt={post.author?.name || "User"}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* USER INFO */}
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-base font-semibold tracking-wide">
                      {post.author?.name || "Unknown user"}
                      {post.author?.role === "ADMIN" && (
                        <VerifiedBadge className="h-5 w-5" />
                      )}
                    </p>

                    <p className="text-sm text-gray-400">
                      @
                      {post.author?.name?.toLowerCase().replace(/\s+/g, "") ||
                        "user"}
                    </p>
                  </div>
                </div>

                {/* OPTIONS */}
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-white/10 hover:text-amber-100"
                >
                  <FriendB usersId={post.author?.id} />
                </button>
              </header>

              {/* CONTENT */}
              {post.content && (
                <div className="mt-5 rounded-2xl border border-white/5 bg-white/[0.02] px-3 py-3 text-amber-50 md:px-4">
                  <p className="text-[15px] leading-7 text-amber-50/90">
                    {post.content}
                  </p>
                </div>
              )}

              {/* MEDIA */}
              {post.image && (
                <div className="mt-4 border">
                  <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/20 shadow-inner shadow-black/20 sm:mx-auto sm:block sm:w-[70vw] md:w-[50vw] lg:w-[40vw]">
                    {post.mediaType === "video" ? (
                      <video
                        src={post.image}
                        controls
                        playsInline
                        preload="metadata"
                        onLoadedMetadata={showVideoPreview}
                        className="max-h-[600px] w-full rounded-[22px] border border-white/30 object-contain"
                      />
                    ) : (
                      <img
                        src={post.image}
                        alt="Post"
                        loading="lazy"
                        className="max-h-[600px] w-full rounded-[22px] border border-white/30 object-contain"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* ACTIONS */}
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-gray-400">
                {/* LIKE */}
                <button
                  type="button"
                  onClick={() => handleLike(post)}
                  disabled={likePending[post.id]}
                  aria-pressed={Boolean(post.likedByUser)}
                  aria-label={
                    post.likedByUser ? "Unlike this post" : "Like this post"
                  }
                  className={`flex items-center gap-2 rounded-full px-2 py-1.5 transition-colors hover:bg-white/5 disabled:cursor-wait disabled:opacity-60 ${post.likedByUser ? "text-rose-400" : "text-gray-400 hover:text-rose-400"}`}
                >
                  <Heart
                    color="currentColor"
                    fill={post.likedByUser ? "currentColor" : "none"}
                    size={24}
                  />

                  <p className="text-sm font-medium">
                    {post._count?.likes || 0}
                  </p>
                </button>

                {/* COMMENTS */}
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full px-2 py-1.5 transition-colors hover:bg-white/5 hover:text-sky-400"
                >
                  <MessageCircle size={24} />

                  <p className="text-sm font-medium">
                    {post._count?.comments || 0}
                  </p>
                </button>

                {/* BOOKMARK */}
                <button
                  type="button"
                  className="rounded-full p-2 transition-colors hover:bg-white/5 hover:text-amber-300"
                >
                  <Bookmark size={24} />
                </button>
              </div>
            </article>
          </main>
        );
      })}
    </>
  );
}

export default Foryou;
