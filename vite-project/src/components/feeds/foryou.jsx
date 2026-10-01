import { Heart, Bookmark, MessageCircle, EllipsisVertical } from "lucide-react";

function Foryou() {
  return (
    <>
      <main className="h-auto mb-52 w-[80vw] mx-auto mt-20 block sm:block sm:mx-auto md:w-[70vw] md:block md:mx-auto lg:w-[45vw]">
        <article className="overflow-hidden rounded-[28px] border border-white/10 bg-[#05070b]/90 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)]">
          <header className="flex items-center gap-4 text-amber-50 justify-between">
            <div className="flex gap-2">
              <div className="h-[50px] w-[50px] overflow-hidden rounded-full border border-white/15 bg-white/10 shadow-lg shadow-black/20">
                <img
                  src="/pfp ideas 🌑.jpg"
                  alt="Robert Steward"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold tracking-wide">
                  Robert Steward
                </p>
                <p className="text-sm text-gray-400">@robertsteward</p>
              </div>
            </div>

            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-white/10 hover:text-amber-100">
              <EllipsisVertical />
            </button>
          </header>

          <div className="mt-5 rounded-2xl border border-white/5 bg-white/[0.02] px-3 py-3 text-amber-50 md:px-4 md:block md:mx-auto">
            <p className="text-[15px] leading-7 text-amber-50/90">
              dsjndncjnd wcbbhudbuhb bhubushb uhbw ubuwbubuweb ubue bubequ ube
              bue buwb ubeu eb ube huu guyg yug ugu gug ug uhbu bu ueuweb uew
            </p>
          </div>

          <div className="mt-4 border">
            <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/20 shadow-inner shadow-black/20 sm:w-[70vw] sm:block sm:mx-auto md:w-[50vw] lg:w-[40vw] ">
              <img
                src="/716142778296315368.jpg"
                className="max-h-[600px] w-full object-contain rounded-[22px] border border-white/30"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-gray-400">
            <div className="flex items-center gap-2 rounded-full px-2 py-1.5 transition-colors hover:bg-white/5 hover:text-rose-400">
              <Heart color="currentColor" size={24} />
              <p className="text-sm font-medium">0</p>
            </div>

            <div className="flex items-center gap-2 rounded-full px-2 py-1.5 transition-colors hover:bg-white/5 hover:text-sky-400">
              <MessageCircle size={24} />
              <p className="text-sm font-medium">15</p>
            </div>

            <div className="rounded-full p-2 transition-colors hover:bg-white/5 hover:text-amber-300">
              <Bookmark size={24} />
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

export default Foryou;
