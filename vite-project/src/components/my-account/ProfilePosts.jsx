import { useState } from "react";
import { Trash2 } from "lucide-react";

const showVideoPreview = (event) => {
  const preview = event.currentTarget;
  if (Number.isFinite(preview.duration) && preview.duration > 0) {
    preview.currentTime = Math.min(0.5, preview.duration / 2);
  }
};

function ProfilePosts({
  posts = [],
  loading = false,
  error = "",
  canDelete = false,
  onDelete,
  title = "Posts",
}) {
  const [showAll, setShowAll] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const visiblePosts = showAll ? posts : posts.slice(0, 4);

  const confirmDelete = async () => {
    if (!pendingDelete || !onDelete) return;

    setDeleting(true);
    setDeleteError("");
    try {
      await onDelete(pendingDelete);
      setPendingDelete(null);
    } catch {
      setDeleteError("Could not delete this post. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="border-t border-white/10 px-5 py-7 sm:px-8 sm:py-9">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <span className="text-xs text-slate-400">{posts.length}</span>
        </div>
        {posts.length > 4 && !loading && !error && (
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:border-cyan-200/25 hover:bg-cyan-200/8"
          >
            {showAll ? "Show less" : "See all"}
          </button>
        )}
      </div>

      {loading ? (
        <p className="py-6 text-sm text-slate-400">Loading posts...</p>
      ) : error ? (
        <p role="alert" className="py-6 text-sm text-rose-200">
          {error}
        </p>
      ) : posts.length ? (
        <div
          className={
            showAll
              ? "grid grid-cols-1 gap-4 md:grid-cols-2"
              : "no-scrollbar flex snap-x gap-3 overflow-x-auto pb-3"
          }
        >
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              className={`min-w-0 overflow-hidden rounded-xl border border-white/10 bg-black/20 ${showAll ? "" : "w-[min(82vw,18rem)] shrink-0 snap-start"}`}
            >
              <div className="flex items-start justify-between gap-3 p-3">
                <p
                  className={`min-w-0 flex-1 text-sm leading-5 text-slate-200 ${showAll ? "whitespace-pre-wrap wrap-break-word" : "line-clamp-4"}`}
                >
                  {post.content || "Media post"}
                </p>
                {canDelete && (
                  <button
                    type="button"
                    onClick={() => setPendingDelete(post)}
                    title="Delete post"
                    aria-label="Delete this post"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-rose-200/75 transition hover:bg-rose-200/10 hover:text-rose-100"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              {post.image &&
                (post.mediaType === "video" ? (
                  <video
                    src={post.image}
                    controls
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={showVideoPreview}
                    className="aspect-video w-full bg-black object-cover"
                  />
                ) : (
                  <img
                    src={post.image}
                    alt="Post attachment"
                    loading="lazy"
                    className="aspect-video w-full bg-black object-cover"
                  />
                ))}
              <p className="px-3 pb-3 text-[11px] text-slate-500">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : ""}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-white/10 bg-black/15 px-4 py-6 text-sm text-slate-400">
          No posts yet.
        </p>
      )}

      {deleteError && (
        <p role="alert" className="mt-3 text-sm text-rose-200">
          {deleteError}
        </p>
      )}

      {pendingDelete && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="presentation"
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-profile-post-title"
            className="w-full max-w-sm rounded-xl border border-white/12 bg-[#10121a] p-5 shadow-2xl"
          >
            <h2
              id="delete-profile-post-title"
              className="text-base font-semibold text-white"
            >
              Delete this post?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              This will permanently remove your post.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setPendingDelete(null)}
                className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="rounded-lg bg-rose-300/15 px-3 py-2 text-sm font-medium text-rose-100 hover:bg-rose-300/25 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete post"}
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

export default ProfilePosts;
