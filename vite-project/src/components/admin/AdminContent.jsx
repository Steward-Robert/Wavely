import { FileText, MessageCircle, Search, Trash2 } from "lucide-react";

const dateLabel = (date) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

function AdminContent({
  kind,
  records,
  pagination,
  search,
  onSearch,
  onPage,
  onDelete,
}) {
  const isPosts = kind === "posts";
  const label = isPosts ? "Posts" : "Comments";

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl">
      <header className="flex flex-col gap-4 border-b border-white/8 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-white">{label}</h2>
          <p className="mt-1 text-xs text-slate-500">
            Review community content and remove violations
          </p>
        </div>
        <label className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 sm:max-w-sm">
          <Search size={17} className="shrink-0 text-slate-500" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder={`Search ${label.toLowerCase()}`}
            aria-label={`Search ${label.toLowerCase()}`}
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-slate-600"
          />
        </label>
      </header>

      {records.length ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-180 border-collapse text-left">
              <thead className="bg-black/15 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                <tr>
                  <th className="px-5 py-3">Content</th>
                  <th className="px-4 py-3">Author</th>
                  {isPosts && (
                    <th className="px-4 py-3 text-right">Engagement</th>
                  )}
                  {!isPosts && <th className="px-4 py-3">On post</th>}
                  <th className="px-4 py-3">Created</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {records.map((record) => (
                  <tr
                    key={record.id}
                    className="transition hover:bg-white/[0.035]"
                  >
                    <td className="max-w-md px-5 py-4">
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/4 text-slate-300">
                          {isPosts ? (
                            <FileText size={15} />
                          ) : (
                            <MessageCircle size={15} />
                          )}
                        </span>
                        {record.image && isPosts && (
                          <img
                            src={record.image}
                            alt="Post attachment"
                            className="h-10 w-10 shrink-0 rounded-lg border border-white/10 object-cover"
                          />
                        )}
                        <p className="line-clamp-3 min-w-0 text-sm leading-5 text-slate-200">
                          {record.content || "No text content"}
                        </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-300">
                      {record.author?.name || "Unknown user"}
                    </td>
                    {isPosts && (
                      <td className="whitespace-nowrap px-4 py-4 text-right text-xs tabular-nums text-slate-400">
                        {record._count.likes} likes | {record._count.comments}{" "}
                        comments
                      </td>
                    )}
                    {!isPosts && (
                      <td className="max-w-48 px-4 py-4 text-xs text-slate-400">
                        <span className="line-clamp-2">
                          {record.post?.content || "Post content unavailable"}
                        </span>
                      </td>
                    )}
                    <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-500">
                      {dateLabel(record.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => onDelete(record)}
                        title={`Delete ${isPosts ? "post" : "comment"}`}
                        aria-label={`Delete ${isPosts ? "post" : "comment"} by ${record.author?.name || "unknown user"}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-rose-200/12 text-rose-100/75 transition hover:border-rose-200/25 hover:bg-rose-200/8 hover:text-rose-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <footer className="flex flex-col gap-3 border-t border-white/8 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <span>
              {pagination.total.toLocaleString()} {label.toLowerCase()}
            </span>
            <div className="flex items-center justify-between gap-2 sm:justify-start">
              <button
                type="button"
                disabled={pagination.page <= 1}
                onClick={() => onPage(pagination.page - 1)}
                className="rounded-lg border border-white/10 px-3 py-2 text-slate-300 transition hover:bg-white/6 disabled:opacity-35"
              >
                Previous
              </button>
              <span className="tabular-nums">
                {pagination.page} / {Math.max(pagination.totalPages, 1)}
              </span>
              <button
                type="button"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => onPage(pagination.page + 1)}
                className="rounded-lg border border-white/10 px-3 py-2 text-slate-300 transition hover:bg-white/6 disabled:opacity-35"
              >
                Next
              </button>
            </div>
          </footer>
        </>
      ) : (
        <div className="px-5 py-14 text-center">
          {isPosts ? (
            <FileText size={22} className="mx-auto text-slate-600" />
          ) : (
            <MessageCircle size={22} className="mx-auto text-slate-600" />
          )}
          <p className="mt-3 text-sm font-medium text-slate-300">
            No {label.toLowerCase()} found
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Try a different search or check back later.
          </p>
        </div>
      )}
    </section>
  );
}

export default AdminContent;
