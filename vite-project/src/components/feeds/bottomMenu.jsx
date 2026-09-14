import { Bookmark, Home, Plus, Settings, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

const menuItems = [
  { label: "Home", path: "/feeds", icon: Home },
  { label: "Friends", path: "/fr", icon: Users },
  { label: "Saved", path: null, icon: Bookmark },
  { label: "Settings", path: "/settigns", icon: Settings },
];

function BMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      aria-label="Mobile navigation"
      className="sticky bottom-3 z-50 mx-3 rounded-2xl border border-white/10 bg-[#08090e]/90 p-2 shadow-[0_16px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:mx-6 md:hidden lg:hidden"
    >
      <div className="grid grid-cols-5 items-end gap-1">
        {menuItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              onClick={() => item.path && navigate(item.path)}
              className={`flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-300/50 ${
                isActive
                  ? "bg-amber-300/12 text-amber-200"
                  : "text-slate-400 hover:bg-white/6 hover:text-white"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          aria-label="Create a post"
          onClick={() => navigate("/pst")}
          className="-mt-6 flex h-14 w-14 items-center justify-center justify-self-center rounded-2xl border border-amber-100/50 bg-amber-300 text-[#211a0b] shadow-[0_8px_24px_rgba(252,211,77,0.25)] transition hover:-translate-y-1 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-[#08090e]"
        >
          <Plus size={27} strokeWidth={2.2} />
        </button>

        {menuItems.slice(2).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              onClick={() => item.path && navigate(item.path)}
              className={`flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-300/50 ${
                isActive
                  ? "bg-amber-300/12 text-amber-200"
                  : "text-slate-400 hover:bg-white/6 hover:text-white"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BMenu;
