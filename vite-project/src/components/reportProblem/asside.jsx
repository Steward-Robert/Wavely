import { Mail, MapPin, Phone } from "lucide-react";

function AsideInfo() {
  return (
    <>
      <aside
        className="
              order-2
              min-w-0
              rounded-2xl
              border
              border-white/10
              bg-white/6
              p-5
              shadow-[0_20px_60px_rgba(0,0,0,0.18)]
              backdrop-blur-xl
              sm:p-6
            "
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
          Contact support
        </p>

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
