import { useCallback, useEffect, useState } from "react";
import { Bookmark, BookmarkX, Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import Header from "../components/header.jsx";
import LSidebar from "../components/sidebar/leftSidbar.jsx";
import VerifiedBadge from "../components/VerifiedBadge.jsx";
import api from "../services/api.js";
import UserContext from "../context/UserContext.jsx";
import Comment from "../components/feeds/comment.jsx";
import getPostMedia from "../utils/postMedia.js";

const formatDate = (date) =>
  date
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(date))
    : "";

function SavedPosts({ alluser = [] }) {
  const currentUser = useContext(UserContext);
  const [savedPosts, setSavedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingPostId, setPendingPostId] = useState("");
  const [likePendingPostId, setLikePendingPostId] = useState("");
  const [commentPostId, setCommentPostId] = useState(null);
  const [commentCounts, setCommentCounts] = useState({});

  useEffect(() => {
    let isCurrent = true;
    const fetchSavedPosts = async () => {
      try {
        const response = await api.get("/savedPost/saved");
        if (isCurrent) {
          setSavedPosts(
            Array.isArray(response.data.savedPosts)
              ? response.data.savedPosts
              : [],
          );
        }
      } catch (requestError) {
        console.error("Error fetching saved posts:", requestError);
        if (isCurrent) {
          setError(
            requestError.response?.data?.message ||
              "Could not load your saved posts. Please try again.",
          );
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    fetchSavedPosts();
    return () => {
      isCurrent = false;
    };
  }, []);

  const removeSavedPost = async (postId) => {
    setPendingPostId(postId);
    setError("");
    try {
      await api.delete(`/savedPost/${encodeURIComponent(postId)}`);
      setSavedPosts((current) =>
        current.filter((saved) => saved.postID !== postId),
      );
    } catch (requestError) {
      console.error("Error removing saved post:", requestError);
      setError(
        requestError.response?.data?.message ||
          "Could not remove this saved post. Please try again.",
      );
    } finally {
      setPendingPostId("");
    }
  };

  const toggleLike = async (post) => {
    if (!post?.id || likePendingPostId === post.id) return;
    const likedByUser = (post.likes ?? []).some(
      (like) => like.userId === currentUser?.id,
    );
    setLikePendingPostId(post.id);
    setError("");

    try {
      const postPath = `/like/${encodeURIComponent(post.id)}`;
      if (likedByUser) {
        await api.delete(postPath);
      } else {
        await api.post(postPath, {});
      }

      setSavedPosts((current) =>
        current.map((saved) =>
          saved.postID === post.id && saved.post
            ? {
                ...saved,
                post: {
                  ...saved.post,
                  likes: likedByUser
                    ? saved.post.likes.filter(
                        (like) => like.userId !== currentUser?.id,
                      )
                    : [
                        ...(saved.post.likes ?? []),
                        { userId: currentUser?.id },
                      ],
                },
              }
            : saved,
        ),
      );
    } catch (requestError) {
      console.error("Error updating saved post like:", requestError);
      setError(
        requestError.response?.data?.message ||
          "Could not update your like. Please try again.",
      );
    } finally {
      setLikePendingPostId("");
    }
  };

  const updateCommentCount = useCallback((postId, count) => {
    setCommentCounts((current) => ({ ...current, [postId]: count }));
  }, []);

  return (
    <main className="min-h-screen bg-[#08090e] pb-20">
      <Header />
      <LSidebar />
      <section className="mx-auto w-[96vw] max-w-3xl px-1 py-8 sm:px-4 md:ml-24 lg:ml-72 lg:w-[min(65vw,800px)]">
        <header className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#05070b]/80 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <Bookmark className="text-amber-200" size={25} />
          <div>
            <h1 className="text-xl font-semibold text-white">Saved posts</h1>
            <p className="text-sm text-slate-400">Posts you have saved for later</p>
          </div>
        </header>

        {error && (
          <p role="alert" className="mb-4 rounded-xl border border-rose-200/15 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </p>
        )}

        {isLoading ? (
          <p role="status" className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center text-slate-300">
            Loading saved posts...
          </p>
        ) : savedPosts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-10 text-center">
            <BookmarkX className="mx-auto mb-3 text-slate-500" size={30} />
            <p className="font-medium text-white">No saved posts yet</p>
            <p className="mt-1 text-sm text-slate-400">
              Posts you save will appear here.
            </p>
          </div>
        ) : (
          savedPosts.map((saved) => {
            const post = saved.post;
            if (!post) return null;
            const authorProfile =
              post.author?.id === currentUser?.id
                ? currentUser
                : alluser.find((user) => user.id === post.author?.id);
            const avatar =
              post.author?.avatar?.avatar ??
              post.author?.avatars?.[0]?.avatar ??
              authorProfile?.avatar?.avatar ??
              authorProfile?.avatars?.at(-1)?.avatar ??
              "/pfp ideas 🌑.jpg";
            return (
              <article
                key={saved.id || saved.postID}
                className="mb-4 overflow-hidden rounded-[28px] border border-white/10 bg-[#05070b]/90 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)] p-4 text-amber-50 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              >
                <header className="flex items-center gap-3">
                  {post.author?.id ? (
                    <Link
                      to={`/user/${encodeURIComponent(post.author.id)}`}
                      aria-label={`View ${post.author.name || "user"}'s profile`}
                      className="shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-200/70"
                    >
                      <img
                        src={avatar}
                        alt=""
                        className="h-12 w-12 rounded-full border border-white/15 object-cover"
                      />
                    </Link>
                  ) : (
                    <img
                      src={avatar}
                      alt=""
                      className="h-12 w-12 rounded-full border border-white/15 object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 font-semibold">
                      {post.author?.id ? (
                        <Link
                          to={`/user/${encodeURIComponent(post.author.id)}`}
                          className="truncate transition hover:text-amber-200 focus:outline-none focus:underline"
                        >
                          {post.author?.name || "Unknown user"}
                        </Link>
                      ) : (
                        <span className="truncate">{post.author?.name || "Unknown user"}</span>
                      )}
                      {post.author?.role === "ADMIN" && <VerifiedBadge className="h-5 w-5" />}
                    </p>
                    <p className="text-sm text-slate-400">
                      @{post.author?.name?.toLowerCase().replace(/\s+/g, "") || "user"}
                      {post.createdAt && (
                        <>
                          <span aria-hidden="true"> · </span>
                          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                        </>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSavedPost(saved.postID)}
                    disabled={pendingPostId === saved.postID}
                    aria-label="Remove from saved posts"
                    className="rounded-full p-2 text-amber-200 transition hover:bg-white/10 disabled:cursor-wait disabled:opacity-60"
                  >
                    <Bookmark size={21} fill="currentColor" />
                  </button>
                </header>
                {post.content && (
                  <p className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-[15px] leading-7 text-amber-50/90">
                    {post.content}
                  </p>
                )}
                {getPostMedia(post).length > 0 && (
                  <div className="mt-4 overflow-hidden rounded-[22px] border border-white/10 bg-black/20">
                    {getPostMedia(post).map((media) =>
                      media.mediaType === "video" ? (
                        <video
                          key={media.id}
                          src={media.url}
                          controls
                          playsInline
                          preload="metadata"
                          className="max-h-[600px] w-full object-contain"
                        />
                      ) : (
                        <img
                          key={media.id}
                          src={media.url}
                          alt="Post"
                          loading="lazy"
                          className="max-h-[600px] w-full object-contain"
                        />
                      ),
                    )}
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-slate-400">
                  <button
                    type="button"
                    onClick={() => toggleLike(post)}
                    disabled={likePendingPostId === post.id}
                    aria-pressed={(post.likes ?? []).some(
                      (like) => like.userId === currentUser?.id,
                    )}
                    aria-label={
                      (post.likes ?? []).some(
                        (like) => like.userId === currentUser?.id,
                      )
                        ? "Unlike this post"
                        : "Like this post"
                    }
                    className={`flex items-center gap-2 rounded-full px-2 py-1.5 transition-colors hover:bg-white/5 disabled:cursor-wait disabled:opacity-60 ${
                      (post.likes ?? []).some(
                        (like) => like.userId === currentUser?.id,
                      )
                        ? "text-rose-400"
                        : "hover:text-rose-400"
                    }`}
                  >
                    <Heart
                      size={22}
                      fill={
                        (post.likes ?? []).some(
                          (like) => like.userId === currentUser?.id,
                        )
                          ? "currentColor"
                          : "none"
                      }
                    />
                    <span className="text-sm font-medium">
                      {post.likes?.length ?? 0}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommentPostId(post.id)}
                    aria-label={`View comments for ${post.author?.name || "this"} post`}
                    className="flex items-center gap-2 rounded-full px-2 py-1.5 transition-colors hover:bg-white/5 hover:text-amber-200"
                  >
                    <MessageCircle size={22} />
                    <span className="text-sm font-medium">
                      {commentCounts[post.id] ?? post.comments?.length ?? 0}
                    </span>
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>
      {commentPostId && (
        <Comment
          postId={commentPostId}
          user={currentUser}
          users={alluser}
          onCommentCountChange={updateCommentCount}
          onClose={() => setCommentPostId(null)}
        />
      )}
    </main>
  );
}

export default SavedPosts;
