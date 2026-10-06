import { Heart, Bookmark, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import VerifiedBadge from "../VerifiedBadge.jsx";
import FriendB from "../button/friendButton.jsx";
import api from "../../services/api.js";

function Foryou({
  onOpenComments,
  commentCounts = {},
}) {
  const [allPost, setAllPost] = useState([]);
  const [likePending, setLikePending] = useState({});
  const [likeError, setLikeError] = useState("");
  const [savedPostIds, setSavedPostIds] = useState(() => new Set());
  const [savedStatusLoaded, setSavedStatusLoaded] = useState(false);
  const [savingPostIds, setSavingPostIds] = useState(() => new Set());
  const [saveError, setSaveError] = useState("");

  const showVideoPreview = (event) => {
    const preview = event.currentTarget;
    if (Number.isFinite(preview.duration) && preview.duration > 0) {
      preview.currentTime = Math.min(0.5, preview.duration / 2);
    }
  };

  const handleLike = async (post) => {
    if (likePending[post.id]) return;

    const likedByUser = Boolean(post.likedByUser);
    setLikePending((current) => ({ ...current, [post.id]: true }));
    setLikeError("");

    try {
      if (likedByUser) {
        await api.delete(`/like/${encodeURIComponent(post.id)}`);
      } else {
        await api.post(`/like/${encodeURIComponent(post.id)}`, {});
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

  const handleSave = async (post) => {
    if (savingPostIds.has(post.id)) return;
    const isSaved = savedPostIds.has(post.id);
    setSavingPostIds((current) => new Set(current).add(post.id));
    setSaveError("");

    try {
      const postPath = `/savedPost/${encodeURIComponent(post.id)}`;
      if (isSaved) {
        await api.delete(postPath);
        setSavedPostIds((current) => {
          const next = new Set(current);
          next.delete(post.id);
          return next;
        });
      } else {
        await api.post(postPath, {});
        setSavedPostIds((current) => new Set(current).add(post.id));
      }
    } catch (requestError) {
      console.error("Error updating saved post:", requestError);
      setSaveError(
        requestError.response?.data?.message ||
          "Could not update your saved posts. Please try again.",
      );
    } finally {
      setSavingPostIds((current) => {
        const next = new Set(current);
        next.delete(post.id);
        return next;
      });
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/post");
        setAllPost(Array.isArray(response.data.posts) ? response.data.posts : []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchSavedPostIds = async () => {
      try {
        const response = await api.get("/savedPost/saved");
        const savedPosts = Array.isArray(response.data.savedPosts)
          ? response.data.savedPosts
          : [];
        setSavedPostIds(new Set(savedPosts.map((saved) => saved.postID)));
      } catch (error) {
        console.error("Error fetching saved posts:", error);
        setSaveError(
          error.response?.data?.message ||
            "Saved-post status could not be loaded.",
        );
      } finally {
        setSavedStatusLoaded(true);
      }
    };

    fetchPosts();
    fetchSavedPostIds();
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
      {saveError && (
        <p
          role="alert"
          className="mx-auto my-3 w-[98vw] text-sm text-rose-200 md:w-[70vw] lg:w-[45vw]"
        >
          {saveError}
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
                <FriendB
                  usersId={post.author?.id}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-white/10 hover:text-amber-100"
                />
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
                  onClick={() => onOpenComments(post.id)}
                  aria-label={`View comments for ${post.author?.name || "this"} post`}
                  className="flex items-center gap-2 rounded-full px-2 py-1.5 transition-colors hover:bg-white/5 hover:text-yellow-200"
                >
                  <MessageCircle aria-hidden="true" size={24} />

                  <p className="text-sm font-medium">
                    {commentCounts[post.id] ?? post._count?.comments ?? 0}
                  </p>
                </button>

                {/* BOOKMARK */}
                <button
                  type="button"
                  onClick={() => handleSave(post)}
                  disabled={!savedStatusLoaded || savingPostIds.has(post.id)}
                  aria-pressed={savedPostIds.has(post.id)}
                  aria-label={savedPostIds.has(post.id) ? "Remove from saved posts" : "Save post"}
                  className={`rounded-full p-2 transition-colors hover:bg-white/5 hover:text-amber-300 disabled:cursor-wait disabled:opacity-60 ${savedPostIds.has(post.id) ? "text-amber-300" : ""}`}
                >
                  <Bookmark size={24} fill={savedPostIds.has(post.id) ? "currentColor" : "none"} />
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
