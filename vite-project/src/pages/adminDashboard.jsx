import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  FileText,
  Flag,
  LayoutDashboard,
  LoaderCircle,
  MessageCircle,
  ShieldCheck,
  Users,
  Waves,
} from "lucide-react";
import AdminContent from "../components/admin/AdminContent.jsx";
import AdminOverview from "../components/admin/AdminOverview.jsx";
import AdminReports from "../components/admin/AdminReports.jsx";
import AdminUsers from "../components/admin/AdminUsers.jsx";
import ConfirmDialog from "../components/admin/ConfirmDialog.jsx";
import api from "../services/api.js";

const sections = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "posts", label: "Posts", icon: FileText },
  { id: "comments", label: "Comments", icon: MessageCircle },
  { id: "reports", label: "Reports", icon: Flag },
];

const emptyPagination = { page: 1, limit: 25, total: 0, totalPages: 0 };

function AdminDashboard({ user }) {
  const navigate = useNavigate();
  const [section, setSection] = useState("overview");
  const [overview, setOverview] = useState({ stats: null, recentActivity: [] });
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState(emptyPagination);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedPostAuthor, setSelectedPostAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [dialog, setDialog] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let current = true;

    const loadData = async () => {
      try {
        if (section === "overview") {
          const response = await api.get("/admin/overview");
          if (current) setOverview(response.data);
          return;
        }

        const isPostAuthors = section === "posts" && !selectedPostAuthor;
        const route = isPostAuthors
          ? "/admin/posts/authors"
          : `/admin/${section}`;
        const params = { page, limit: 25 };
        if (search.trim() && section !== "reports") params.q = search.trim();
        if (section === "posts" && selectedPostAuthor?.id) {
          params.authorId = selectedPostAuthor.id;
        }
        if (section === "reports" && statusFilter) params.status = statusFilter;
        const response = await api.get(route, { params });
        const key = isPostAuthors ? "authors" : section;
        if (current) {
          setRecords(response.data[key] || []);
          setPagination(response.data.pagination || emptyPagination);
        }
      } catch (requestError) {
        if (current) {
          setError(
            requestError.response?.data?.message ||
              "Unable to load dashboard data.",
          );
          if (
            requestError.response?.status === 401 ||
            requestError.response?.status === 403
          ) {
            navigate("/", { replace: true });
          }
        }
      } finally {
        if (current) setLoading(false);
      }
    };

    loadData();
    return () => {
      current = false;
    };
  }, [
    section,
    page,
    search,
    statusFilter,
    selectedPostAuthor,
    refreshVersion,
    navigate,
  ]);

  const beginLoad = () => {
    setLoading(true);
    setError("");
  };

  const refreshData = () => {
    beginLoad();
    setRefreshVersion((version) => version + 1);
  };

  const selectSection = (nextSection) => {
    if (nextSection === section) return;
    beginLoad();
    setSection(nextSection);
    setPage(1);
    setSearch("");
    setStatusFilter("");
    setSelectedPostAuthor(null);
  };

  const requestAction = (nextDialog) => setDialog(nextDialog);

  const confirmAction = async () => {
    if (!dialog?.action) return;
    setBusy(true);
    setError("");
    try {
      await dialog.action();
      setDialog(null);
      setLoading(true);
      setRefreshVersion((version) => version + 1);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "The requested action could not be completed.",
      );
    } finally {
      setBusy(false);
    }
  };

  const askToggleUser = (targetUser) => {
    const nextActive = !targetUser.isActive;
    requestAction({
      title: nextActive
        ? "Reactivate this account?"
        : "Deactivate this account?",
      description: nextActive
        ? `${targetUser.name} will be able to sign in and use Wavely again.`
        : `${targetUser.name} will be signed out and blocked from future requests. This can be reversed later.`,
      confirmLabel: nextActive ? "Reactivate account" : "Deactivate account",
      danger: !nextActive,
      action: () =>
        api.patch(`/admin/users/${targetUser.id}/status`, {
          isActive: nextActive,
        }),
    });
  };

  const askDeleteUser = (targetUser) => {
    requestAction({
      title: "Delete this user account?",
      description: `This permanently deletes ${targetUser.name}'s account, posts, stories, comments, and uploaded media. This action cannot be undone.`,
      confirmLabel: "Delete account",
      danger: true,
      action: () => api.delete(`/admin/users/${targetUser.id}`),
    });
  };

  const askDelete = (record, kind) => {
    const isPost = kind === "posts";
    requestAction({
      title: `Delete this ${isPost ? "post" : "comment"}?`,
      description: isPost
        ? "This permanently removes the post, its comments, likes, and stored image. This action cannot be undone."
        : "This permanently removes the selected comment. This action cannot be undone.",
      confirmLabel: `Delete ${isPost ? "post" : "comment"}`,
      danger: true,
      action: () => api.delete(`/admin/${kind}/${record.id}`),
    });
  };

  const handleReportStatus = async (report, status) => {
    beginLoad();
    setError("");
    try {
      await api.patch(`/admin/reports/${report.id}`, { status });
      setRefreshVersion((version) => version + 1);
    } catch (requestError) {
      setLoading(false);
      setError(
        requestError.response?.data?.message ||
          "Unable to update report status.",
      );
    }
  };

  const handleSelectPostAuthor = (author) => {
    beginLoad();
    setSelectedPostAuthor(author);
    setSearch("");
    setPage(1);
  };

  const selectedSection = sections.find((item) => item.id === section);
  const SelectedIcon = selectedSection.icon;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090e] text-white">
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#08090e]/85 px-3 py-3 backdrop-blur-2xl sm:px-5 lg:px-8">
        <div className="mx-auto flex h-11 max-w-[1600px] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-200/8 text-cyan-100 shadow-[0_0_24px_rgba(103,232,249,0.08)]">
              <Waves size={21} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Wavely
              </p>
              <p className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100/55 sm:block">
                Admin console
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden text-right sm:block">
              <p className="max-w-40 truncate text-xs font-medium text-white">
                {user.name}
              </p>
              <p className="text-[10px] text-violet-200/70">Administrator</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-200/20 bg-violet-200/8 text-violet-100 sm:hidden">
              <ShieldCheck size={17} />
            </span>
            <button
              type="button"
              onClick={() => navigate("/feeds")}
              title="Return to Wavely"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-cyan-200/25 hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">Back to Wavely</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1600px] gap-4 px-3 pb-10 pt-5 sm:px-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-7 lg:px-8 lg:pt-7">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
          <nav
            aria-label="Admin sections"
            className="flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-2xl border border-white/8 bg-white/[0.035] p-2 backdrop-blur-xl no-scrollbar lg:flex-col lg:overflow-visible lg:snap-none"
          >
            <p className="hidden px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 lg:block">
              Workspace
            </p>
            {sections.map((item) => {
              const Icon = item.icon;
              const active = section === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectSection(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={`flex shrink-0 snap-start items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition sm:text-sm lg:w-full ${active ? "border-cyan-200/20 bg-cyan-200/8 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" : "border-transparent text-slate-400 hover:border-white/8 hover:bg-white/5 hover:text-white"}`}
                >
                  <Icon size={17} strokeWidth={1.8} />
                  {item.label}
                  {item.id === "reports" && overview.stats?.openReports > 0 && (
                    <span className="ml-auto hidden min-w-5 rounded-full bg-amber-200/12 px-1.5 py-0.5 text-center text-[10px] text-amber-100 lg:inline-block">
                      {overview.stats.openReports}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="mt-auto hidden rounded-xl border border-violet-200/10 bg-violet-200/[0.035] p-3 lg:block">
              <div className="flex items-center gap-2 text-violet-100">
                <ShieldCheck size={16} />
                <span className="text-xs font-medium">
                  Admin access verified
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                Authorization is checked against the current account role for
                every admin request.
              </p>
            </div>
          </nav>
        </aside>

        <main className="min-w-0">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-100">
              <SelectedIcon size={17} />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Wavely control room
              </p>
              <h1 className="mt-0.5 text-lg font-semibold text-white">
                {selectedSection.label}
              </h1>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-rose-200/15 bg-rose-200/6 px-4 py-3 text-sm text-rose-100"
            >
              <span>{error}</span>
              <button
                type="button"
                onClick={refreshData}
                className="shrink-0 rounded-lg border border-rose-200/15 px-3 py-1.5 text-xs hover:bg-rose-200/8"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex min-h-64 items-center justify-center rounded-2xl border border-white/8 bg-white/2.5 text-sm text-slate-400">
              <LoaderCircle
                size={18}
                className="mr-2 animate-spin text-cyan-200"
              />
              Loading {selectedSection.label.toLowerCase()}...
            </div>
          ) : section === "overview" ? (
            <AdminOverview
              stats={overview.stats}
              activity={overview.recentActivity}
              onNavigate={selectSection}
            />
          ) : section === "users" ? (
            <AdminUsers
              users={records}
              pagination={pagination}
              search={search}
              onSearch={(value) => {
                beginLoad();
                setSearch(value);
                setPage(1);
              }}
              onPage={(value) => {
                beginLoad();
                setPage(value);
              }}
              onToggleStatus={askToggleUser}
              onDeleteUser={askDeleteUser}
              currentUserId={user.id}
            />
          ) : section === "posts" || section === "comments" ? (
            <AdminContent
              kind={section}
              records={records}
              pagination={pagination}
              search={search}
              onSearch={(value) => {
                beginLoad();
                setSearch(value);
                setPage(1);
              }}
              onPage={(value) => {
                beginLoad();
                setPage(value);
              }}
              onDelete={(record) => askDelete(record, section)}
              selectedAuthor={section === "posts" ? selectedPostAuthor : null}
              onSelectAuthor={handleSelectPostAuthor}
              onBackToPosts={() => {
                beginLoad();
                setSelectedPostAuthor(null);
                setPage(1);
                setSearch("");
              }}
            />
          ) : (
            <AdminReports
              reports={records}
              pagination={pagination}
              statusFilter={statusFilter}
              onStatusFilter={(value) => {
                beginLoad();
                setStatusFilter(value);
                setPage(1);
              }}
              onPage={(value) => {
                beginLoad();
                setPage(value);
              }}
              onStatusChange={handleReportStatus}
            />
          )}
        </main>
      </div>

      <ConfirmDialog
        dialog={dialog}
        busy={busy}
        onClose={() => setDialog(null)}
        onConfirm={confirmAction}
      />
    </div>
  );
}

export default AdminDashboard;
