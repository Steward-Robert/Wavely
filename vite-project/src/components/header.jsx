import {
  Bell,
  Bookmark,
  Home,
  MessageCircle,
  Plus,
  Settings,
  Users,
  Waves,
} from "lucide-react";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import UserContext from "../context/UserContext.jsx";

const menuItems = [
  { label: "Home", path: "/feeds", icon: Home },
  { label: "Friends", path: "/fr", icon: Users },
  { label: "Saved", icon: Bookmark },
  { label: "Create a post", path: "/pst", icon: Plus },
  { label: "Messages", icon: MessageCircle },
  { label: "Notifications", icon: Bell },
  { label: "Settings", path: "/settigns", icon: Settings },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarUrl =
    user?.avatar?.avatar ??
    user?.avatars?.at(-1)?.avatar ??
    "/pfp ideas 🌑.jpg";

  function handleMenuItemClick(path) {
    if (path) navigate(path);
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090e]/80 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_24px_rgba(103,232,249,0.12)]">
            <Waves size={22} strokeWidth={1.7} className="header-wave-motion" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-xl">
              Wavely
            </h1>
            <p className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-cyan-200/60 sm:block">
              Connect. Share. Discover.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 sm:gap-3 md:flex">
            <button
              type="button"
              aria-label="Open messages"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-cyan-200/30 hover:bg-white/8 hover:text-cyan-100"
            >
              <MessageCircle size={19} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              aria-label="Open notifications"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-cyan-200/30 hover:bg-white/8 hover:text-cyan-100"
            >
              <Bell size={19} strokeWidth={1.8} />
            </button>
          </div>
          <button
            type="button"
            aria-label="Open profile"
            onClick={() => navigate("/account")}
            className="h-11 w-11 cursor-pointer rounded-full border border-cyan-200/30 p-0.5 shadow-[0_0_18px_rgba(103,232,249,0.1)]"
          >
            <img
              src={avatarUrl}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          </button>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl border border-white/15 bg-white/5 text-white transition hover:border-cyan-200/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-200/60 md:hidden"
          >
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                isMenuOpen ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation-menu"
        aria-label="Mobile navigation"
        className={`absolute right-4 top-full mt-2 w-60 rounded-2xl border border-white/15 bg-[#08090e]/95 p-2 shadow-[0_16px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-200 md:hidden ${
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.label}
              type="button"
              aria-current={isActive ? "page" : undefined}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => handleMenuItemClick(item.path)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-200/50 ${
                isActive
                  ? "bg-cyan-300/12 text-cyan-100"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
