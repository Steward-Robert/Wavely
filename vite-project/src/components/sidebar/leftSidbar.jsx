import {
  Home,
  User,
  Plus,
  Bookmark,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import UserContext from "../../context/UserContext.jsx";

const navItems = [
  { label: "Home", path: "/feeds", icon: Home },
  { label: "Friends", path: "/fr", icon: User },
  { label: "Create a post", path: "/pst", icon: Plus },
  { label: "Saved", path: "/saved", icon: Bookmark },
  { label: "Settings", path: "/settigns", icon: Settings },
];

function LSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useContext(UserContext);
  const visibleNavItems =
    user?.role === "ADMIN"
      ? [
          ...navItems,
          { label: "Admin Dashboard", path: "/admin", icon: ShieldCheck },
        ]
      : navItems;

  return (
    <aside className="fixed left-3 top-24 z-50 hidden md:block lg:top-28">
      <nav className="flex w-16 flex-col gap-4 rounded-2xl border border-white/10 bg-[#05070b]/90 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:w-60">
        <div className="mb-2 border-b border-white/10 px-2 pb-3 lg:px-3">
          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-100/65 lg:block">
            Navigate
          </p>
          <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-amber-200/80 lg:hidden" />
        </div>

        {visibleNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path && location.pathname === item.path;

          return (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              title={
                item.label === "Admin Dashboard"
                  ? "Open the Admin Dashboard"
                  : item.label
              }
              onClick={() => item.path && navigate(item.path)}
              className={`group flex h-12 w-full items-center justify-center gap-3 rounded-xl border px-2 text-left transition duration-500 hover:translate-x-2 lg:justify-start lg:px-3 ${
                item.path === "/admin"
                  ? isActive
                    ? "border-cyan-200/35 bg-cyan-300/12 text-cyan-100 shadow-[0_0_22px_rgba(103,232,249,0.12)]"
                    : "border-cyan-200/15 bg-cyan-300/5 text-cyan-100/80 hover:border-cyan-200/35 hover:bg-cyan-300/10"
                  : isActive
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
