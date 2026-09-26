import { Send, UserPlus, UserRound, Users } from "lucide-react";

function FriendMenu({ activeMenu, setActiveMenu }) {
  const menuItems = [
    { id: "received", label: "Requests", Icon: UserPlus },
    { id: "sent", label: "Sent", Icon: Send },
    { id: "friends", label: "My friends", Icon: Users },
    { id: "people", label: "Discover", Icon: UserRound },
  ];

  return (
    <section className="pt-1">
      <div className="mb-6 border-b border-white/10 pb-5 sm:mb-7 sm:pb-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200/70">
          Community
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Connect with others
        </h1>
      </div>

      <nav
        aria-label="Friend sections"
        className="grid grid-cols-2 gap-1.5 rounded-2xl border border-white/15 bg-white/[0.07] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:grid-cols-4"
      >
          {menuItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveMenu(id)}
              className={`flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl border px-2 text-xs font-medium transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 sm:text-sm sm:px-4 ${
                activeMenu === id
                  ? "border-amber-100/25 bg-amber-100/15 text-amber-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                  : "border-transparent text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={16} strokeWidth={1.8} />
              {label}
            </button>
          ))}
      </nav>
    </section>
  );
}

export default FriendMenu;
