function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-[3px]">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <div className="absolute h-16 w-16 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute inset-0 animate-spin rounded-full border border-white/10 border-t-white/80" />

        <div className="absolute h-16 w-16 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-2 border-white/10 border-b-white/60" />

        <span className="relative text-2xl font-semibold tracking-tight text-white">
          W
        </span>
      </div>
    </div>
  );
}

export default Loader;
