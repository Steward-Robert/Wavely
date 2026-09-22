import { Bell, MessageCircle, Waves } from "lucide-react";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
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
            className="h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-cyan-200/30 hover:bg-white/8 hover:text-cyan-100 sm:flex flex items-center"
          >
            <Bell size={19} strokeWidth={1.8} />
          </button>
          <div
            className="h-10 w-10 rounded-full border border-cyan-200/30 p-0.5 shadow-[0_0_18px_rgba(103,232,249,0.1) cursor-pointer"
            onClick={() => navigate("/account")}
          >
            <img
              src="/1787604938678.png"
              alt="Wavely profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
