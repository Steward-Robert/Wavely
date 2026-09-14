function FriendMenu({ activeMenu, setActiveMenu }) {
  const menuItems = [
    ["received", "Friend requests"],
    ["sent", "Sent requests"],
    ["friends", "My friends"],
    ["people", "People you may know"],
  ];

  return (
    <div className="mt-5">
      <p className="ml-6 mb-5 text-xl font-semibold tracking-tight text-white lg:fixed lg:right-7.5 lg:top-25 lg:text-2xl">
        Connect with others
      </p>

      <div className="mx-auto flex w-[350px] items-center justify-center rounded-2xl border border-white/10 bg-black/30 lg:fixed lg:right-1 lg:top-40 lg:w-[270px] lg:border-none lg:bg-transparent lg:py-3">
        <div className="my-2.5 flex w-full flex-col gap-1.5 px-2 text-base">
          {menuItems.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveMenu(id)}
              className={`flex h-11 w-full items-center rounded-xl border pl-4 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300/50 ${
                activeMenu === id
                  ? "border-amber-300/40 bg-amber-300/12 text-amber-100 shadow-[0_8px_24px_rgba(252,211,77,0.08)]"
                  : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/8 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendMenu;
