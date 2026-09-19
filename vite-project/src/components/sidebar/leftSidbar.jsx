import { Home, User, Plus, Bookmark, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

const navItems = [
  { label: "Home", path: "/feeds", icon: Home },
  { label: "Friends", path: "/fr", icon: User },
  { label: "Create a post", path: "/pst", icon: Plus },
  { label: "Saved", path: null, icon: Bookmark },
  { label: "Settings", path: "/settigns", icon: Settings },
];

function LSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-3 top-24 z-50 hidden md:block lg:top-28">
      <nav className="flex w-16 flex-col gap-4 rounded-2xl border border-white/15 bg-white/5 p-2 shadow-2xl shadow-black/20 backdrop-blur-xl lg:w-60">
        <div className="mb-2 border-b border-white/10 px-2 pb-3 lg:px-3">
          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-100/65 lg:block">
            Navigate
          </p>
          <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-amber-200/80 lg:hidden" />
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path && location.pathname === item.path;

          return (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              onClick={() => item.path && navigate(item.path)}
              className={`group flex h-12 w-full items-center justify-center gap-3 rounded-xl border px-2 text-left transition duration-500 hover:translate-x-2 lg:justify-start lg:px-3 ${
                isActive
                  ? "border-amber-200/30 bg-amber-300/15 text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                  : "border-transparent text-slate-400 hover:border-white/15 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="hidden text-base font-medium lg:block">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
export default LSidebar;
