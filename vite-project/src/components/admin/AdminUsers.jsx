import { Eye, Search, Trash2, UserCheck, UserRoundX } from "lucide-react";
import { useNavigate } from "react-router";
import VerifiedBadge from "../VerifiedBadge.jsx";

const dateLabel = (date) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
    new Date(date),
  );

function AdminUsers({
  users,
  pagination,
  search,
  onSearch,
  onPage,
  onToggleStatus,
  onDeleteUser,
  currentUserId,
}) {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl">
      <header className="flex flex-col gap-4 border-b border-white/8 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-white">Users</h2>
          <p className="mt-1 text-xs text-slate-500">
            Account details and community activity
          </p>
        </div>
        <label className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 sm:max-w-sm">
          <Search size={17} className="shrink-0 text-slate-500" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search name or email"
            aria-label="Search users by name or email"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-slate-600"
          />
        </label>
      </header>

      {users.length ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-180 border-collapse text-left">
              <thead className="bg-black/15 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                <tr>
                  <th className="px-5 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-white/[0.035]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex max-w-72 items-center gap-3">
                        <img
                          src={
                            user.avatar?.avatar ||
                            user.avatars?.[0]?.avatar ||
                            "/pfp ideas 🌑.jpg"
                          }
                          alt={`${user.name} profile`}
                          className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-medium text-white">
                              {user.name}
                            </p>
                            {user.role === "ADMIN" && (
                              <VerifiedBadge className="h-5 w-5" />
                            )}
                          </div>
                          <p className="mt-1 truncate text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] ${user.role === "ADMIN" ? "border-violet-200/20 bg-violet-200/8 text-violet-100" : "border-white/10 bg-white/4 text-slate-300"}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-400">
                      {dateLabel(user.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-2 text-xs ${user.isActive ? "text-emerald-200" : "text-slate-500"}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${user.isActive ? "bg-emerald-300" : "bg-slate-600"}`}
                        />
                        {user.isActive ? "Active" : "Deactivated"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/user/${user.id}`)}
                          title={`View ${user.name}'s profile`}
                          aria-label={`View ${user.name}'s profile`}
                          className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/15 bg-cyan-200/6 px-2.5 py-2 text-xs text-cyan-100 transition hover:border-cyan-200/25 hover:bg-cyan-200/10"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          disabled={user.id === currentUserId && user.isActive}
                          onClick={() => onToggleStatus(user)}
                          title={
                            user.isActive
                              ? "Deactivate account"
                              : "Reactivate account"
                          }
                          aria-label={`${user.isActive ? "Deactivate" : "Reactivate"} ${user.name}`}
                          className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs transition disabled:cursor-not-allowed disabled:opacity-35 ${user.isActive ? "border-rose-200/12 text-rose-100/80 hover:border-rose-200/25 hover:bg-rose-200/8" : "border-emerald-200/15 text-emerald-100/80 hover:border-emerald-200/25 hover:bg-emerald-200/8"}`}
                        >
                          {user.isActive ? (
                            <UserRoundX size={15} />
                          ) : (
                            <UserCheck size={15} />
                          )}
                          <span>
                            {user.isActive ? "Deactivate" : "Reactivate"}
                          </span>
                        </button>
                        <button
                          type="button"
                          disabled={user.id === currentUserId}
                          onClick={() => onDeleteUser(user)}
                          title={`Delete ${user.name}'s account`}
                          aria-label={`Delete ${user.name}'s account`}
                          className="inline-flex items-center justify-center rounded-lg border border-rose-200/12 px-2.5 py-2 text-rose-100/80 transition hover:border-rose-200/25 hover:bg-rose-200/8 disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <footer className="flex flex-col gap-3 border-t border-white/8 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <span>{pagination.total.toLocaleString()} accounts</span>
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
        <div className="px-5 py-14 text-center text-sm text-slate-500">
          No users match this search.
        </div>
      )}
    </section>
  );
}

export default AdminUsers;
