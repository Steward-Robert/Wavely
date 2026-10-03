import { Mail, MapPin, Phone, Undo2 } from "lucide-react";
import { useNavigate } from "react-router";

function AsideInfo() {
  const navigate = useNavigate();
  return (
    <>
      <aside
        className="
              order-2
              min-w-0
              rounded-2xl
              border
              border-white/10
              bg-[#05070b]/90
              p-5
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              backdrop-blur-xl backdrop-saturate-150
              bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)]
              sm:p-6
              mb-25
              lg:mb-0
              md:w-[70vw]
              md:block
              md:mx-auto
              lg:w-auto
            "
      >
        <div className="relative mb-4 lg:pt-5">
          <button
            onClick={() => navigate("/settigns")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-white/10 hover:text-amber-100 sm:absolute sm:right-0 sm:top-0 absolute right-0"
            aria-label="Go back"
          >
            <Undo2 size={18} className="text-current" />
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
            Contact support
          </p>
        </div>

        <h2 className="mt-3 text-xl font-semibold text-white">
          We are here to listen
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Prefer to reach out directly? Use one of these channels and a member
          of the Wavely team will help.
        </p>

        <div className="mt-6 space-y-3">
          {/* PHONE */}
          <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/8 bg-black/15 p-3 text-sm text-slate-200 transition hover:border-cyan-200/25 hover:bg-cyan-300/8">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
              <Phone size={18} strokeWidth={1.8} />
            </span>

            <span className="min-w-0">
              <span className="block text-xs text-slate-500">Phone</span>

              <span className="mt-0.5 block break-words">
                +(509) 48 68 5845
              </span>
            </span>
          </div>

          {/* EMAIL */}
          <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/8 bg-black/15 p-3 text-sm text-slate-200 transition hover:border-cyan-200/25 hover:bg-cyan-300/8">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
              <Mail size={18} strokeWidth={1.8} />
            </span>

            <span className="min-w-0">
              <span className="block text-xs text-slate-500">Email</span>

              <span className="mt-0.5 block break-all">
                wavelysupport@gmail.com
              </span>
            </span>
          </div>

          {/* LOCATION */}
          <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/8 bg-black/15 p-3 text-sm text-slate-200">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-200/10 text-amber-100">
              <MapPin size={18} strokeWidth={1.8} />
            </span>

            <span className="min-w-0">
              <span className="block text-xs text-slate-500">Based in</span>

              <span className="mt-0.5 block break-words">
                Cap-Haitien, Haiti
              </span>
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AsideInfo;
