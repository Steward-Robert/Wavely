import { ExternalLink, Flag } from "lucide-react";

const dateLabel = (date) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

const statusStyle = {
  OPEN: "border-amber-200/20 bg-amber-200/8 text-amber-100",
  REVIEWED: "border-cyan-200/20 bg-cyan-200/8 text-cyan-100",
  DISMISSED: "border-slate-200/12 bg-white/4 text-slate-400",
};

function AdminReports({
  reports,
  pagination,
  statusFilter,
  onStatusFilter,
  onPage,
  onStatusChange,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl">
      <header className="flex flex-col gap-4 border-b border-white/8 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-white">Reports</h2>
          <p className="mt-1 text-xs text-slate-500">
            Review submitted issues and reported content
          </p>
        </div>
        <label className="flex flex-col items-start gap-2 text-xs text-slate-400 sm:flex-row sm:items-center">
          Status
          <select
            value={statusFilter}
            onChange={(event) => onStatusFilter(event.target.value)}
            className="rounded-xl border border-white/10 bg-[#11131b] px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-200/35"
          >
            <option value="">All reports</option>
            <option value="OPEN">Open</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="DISMISSED">Dismissed</option>
          </select>
        </label>
      </header>

      {reports.length ? (
        <>
          <div className="divide-y divide-white/6">
            {reports.map((report) => (
              <article
                key={report.id}
                className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide ${statusStyle[report.status]}`}
                    >
                      {report.status}
                    </span>
                    <span className="text-xs font-medium text-cyan-100">
                      {report.type}
                    </span>
                    <span className="text-xs text-slate-600">|</span>
                    <span className="text-xs text-slate-400">
                      {report.targetType}
                      {report.targetId ? ` | ${report.targetId}` : ""}
                    </span>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-200">
                    {report.reason}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span>
                      From{" "}
                      <span className="text-slate-300">
                        {report.reporter?.name || "Unknown user"}
                      </span>{" "}
                      ({report.reporter?.email || "no email"})
                    </span>
                    <time dateTime={report.createdAt}>
                      {dateLabel(report.createdAt)}
                    </time>
                    {report.handledBy && (
                      <span>
                        Handled by{" "}
                        <span className="text-slate-300">
                          {report.handledBy.name}
                        </span>
                      </span>
                    )}
                    {report.attachmentUrl && (
                      <a
                        href={report.attachmentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-cyan-200 transition hover:text-cyan-100"
                      >
                        View attachment <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  {report.status !== "REVIEWED" && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(report, "REVIEWED")}
                      className="rounded-lg border border-cyan-200/15 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:bg-cyan-200/8"
                    >
                      Mark reviewed
                    </button>
                  )}
                  {report.status !== "DISMISSED" && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(report, "DISMISSED")}
                      className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/6"
                    >
                      Dismiss
                    </button>
                  )}
                  {report.status !== "OPEN" && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(report, "OPEN")}
                      className="rounded-lg border border-amber-200/15 px-3 py-2 text-xs font-medium text-amber-100 transition hover:bg-amber-200/8"
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
          <footer className="flex flex-col gap-3 border-t border-white/8 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <span>{pagination.total.toLocaleString()} reports</span>
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
          <Flag size={22} className="mx-auto text-slate-600" />
          <p className="mt-3 text-sm font-medium text-slate-300">
            No reports in this view
          </p>
          <p className="mt-1 text-xs text-slate-500">
            New user reports will appear here.
          </p>
        </div>
      )}
    </section>
  );
}

export default AdminReports;
