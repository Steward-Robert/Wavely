import {
  BookOpenText,
  ArrowRight,
  FileText,
  Flag,
  Heart,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

const statCards = [
  { key: "totalUsers", label: "Total users", icon: Users, tone: "cyan" },
  { key: "totalPosts", label: "Posts", icon: FileText, tone: "violet" },
  {
    key: "totalComments",
    label: "Comments",
    icon: MessageCircle,
    tone: "blue",
  },
  { key: "totalLikes", label: "Likes", icon: Heart, tone: "rose" },
  { key: "totalStories", label: "Stories", icon: BookOpenText, tone: "amber" },
  { key: "totalReports", label: "Reports", icon: Flag, tone: "orange" },
];

const toneStyles = {
  cyan: "border-cyan-200/20 bg-cyan-200/8 text-cyan-100",
  violet: "border-violet-200/20 bg-violet-200/8 text-violet-100",
  blue: "border-sky-200/20 bg-sky-200/8 text-sky-100",
  rose: "border-rose-200/20 bg-rose-200/8 text-rose-100",
  amber: "border-amber-200/20 bg-amber-200/8 text-amber-100",
  orange: "border-orange-200/20 bg-orange-200/8 text-orange-100",
};

const formatDate = (value) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

function AdminOverview({ stats, activity, onNavigate }) {
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-3xl border border-cyan-100/12 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.13),transparent_48%),linear-gradient(135deg,rgba(18,21,31,0.94),rgba(9,10,15,0.88))] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/75">
              Wavely / Administration
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Platform overview
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              A live view of community activity and the moderation queue.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200/15 bg-emerald-200/6 px-3 py-2 text-xs font-medium text-emerald-100">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
            {stats
              ? `${stats.activeUsers.toLocaleString()} active accounts`
              : "Live data unavailable"}
          </div>
        </div>
      </section>

      <section
        aria-label="Platform statistics"
        className="grid grid-cols-2 gap-3 xl:grid-cols-3"
      >
        {statCards.map(({ key, label, icon: Icon, tone }) => (
          <article
            key={key}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl transition hover:border-white/18 hover:bg-white/7 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-medium text-slate-400 sm:text-sm">
                {label}
              </p>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${toneStyles[tone]}`}
              >
                <Icon size={17} strokeWidth={1.8} />
              </span>
            </div>
            <p className="mt-5 text-2xl font-semibold tabular-nums text-white sm:text-3xl">
              {stats ? Number(stats[key] || 0).toLocaleString() : "N/A"}
            </p>
            {key === "totalReports" && (
              <button
                type="button"
                onClick={() => onNavigate("reports")}
                className="mt-2 inline-flex items-center gap-1 text-xs text-cyan-200 transition hover:text-cyan-100"
              >
                {stats
                  ? `${stats.openReports} need review`
                  : "Review queue unavailable"}
                <ArrowRight size={13} aria-hidden="true" />
              </button>
            )}
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-4 py-4 sm:px-5">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Recent moderation
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Latest report decisions recorded by admins
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("reports")}
            className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-cyan-200/25 hover:text-cyan-100"
          >
            Open reports
          </button>
        </header>
        {activity?.length ? (
          <div className="divide-y divide-white/6">
            {activity.map((item) => (
              <article
                key={item.id}
                className="flex min-w-0 flex-col items-start gap-2 px-4 py-4 sm:flex-row sm:items-start sm:gap-3 sm:px-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-200/15 bg-violet-200/8 text-violet-100">
                  <ShieldCheck size={17} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-slate-200">
                    <span className="font-medium text-white">
                      {item.handledBy?.name || "Admin"}
                    </span>{" "}
                    marked a {item.targetType.toLowerCase()} report{" "}
                    {item.status.toLowerCase()}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {item.type} | Reported by{" "}
                    {item.reporter?.name || "Unknown user"}
                  </p>
                </div>
                <time
                  className="self-end text-[10px] text-slate-500 sm:shrink-0 sm:self-auto sm:text-[11px]"
                  dateTime={item.updatedAt}
                >
                  {formatDate(item.updatedAt)}
                </time>
              </article>
            ))}
          </div>
        ) : (
          <div className="px-5 py-10 text-center">
            <ShieldCheck size={22} className="mx-auto text-slate-600" />
            <p className="mt-3 text-sm font-medium text-slate-300">
              No moderation activity yet
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Completed report reviews will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminOverview;
