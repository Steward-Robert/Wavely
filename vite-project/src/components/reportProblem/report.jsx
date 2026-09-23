import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";

function Report() {
  const screenshot = useRef(null);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleFileChange = (event) => {
    setFileName(event.target.files?.[0]?.name ?? "");
  };

  return (
    <main className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-6xl px-4 pb-32 pt-10 sm:px-6 sm:pt-14 lg:px-10 lg:pb-20 lg:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[minmax(175px,220px)_minmax(0,1fr)_minmax(250px,300px)] lg:items-start lg:gap-6">
          <aside className="order-3 rounded-2xl border border-white/10 bg-white/6 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-6 lg:relative lg:right-0 lg:col-start-3 lg:row-start-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
              Contact support
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white">
              We are here to listen
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Prefer to reach out directly? Use one of these channels and a
              member of the Wavely team will help.
            </p>

            <div className="mt-6 space-y-3">
              <div
                aria-readonly="true"
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/15 p-3 text-sm text-slate-200 transition hover:border-cyan-200/25 hover:bg-cyan-300/8"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
                  <Phone size={18} strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-xs text-slate-500">Phone</span>
                  <span className="mt-0.5 block">+(509) 48 68 5845</span>
                </span>
              </div>
              <div
                aria-readonly="true"
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/15 p-3 text-sm text-slate-200 transition hover:border-cyan-200/25 hover:bg-cyan-300/8"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
                  <Mail size={18} strokeWidth={1.8} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-slate-500">Email</span>
                  <span className="mt-0.5 block truncate">
                    wavelysupport@gmail.com
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/15 p-3 text-sm text-slate-200">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-200/10 text-amber-100">
                  <MapPin size={18} strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-xs text-slate-500">Based in</span>
                  <span className="mt-0.5 block">Cap-Haitien, Haiti</span>
                </span>
              </div>
            </div>
          </aside>

          <section className="order-1 rounded-3xl border border-white/10 bg-white/6 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8 lg:col-start-2 lg:row-start-1">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">
                  Send a report
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  What can we improve?
                </h2>
              </div>
              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 sm:flex">
                <ArrowRight size={18} />
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-200"
                >
                  Email address
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 transition focus-within:border-cyan-200/50 focus-within:ring-2 focus-within:ring-cyan-200/10">
                  <Mail size={18} className="shrink-0 text-slate-500" />
                  <input
                    id="email"
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="issue"
                  className="text-sm font-medium text-slate-200"
                >
                  Issue type
                </label>
                <select
                  required
                  name="issue"
                  id="issue"
                  defaultValue=""
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#11131b] px-3 py-3 text-sm text-slate-200 outline-none transition focus:border-cyan-200/50 focus:ring-2 focus:ring-cyan-200/10"
                >
                  <option value="" disabled>
                    Select an issue
                  </option>
                  <option value="Post or comment issue">
                    Post or comment issue
                  </option>
                  <option value="Friend request problem">
                    Friend request problem
                  </option>
                  <option value="Messaging problem">Messaging problem</option>
                  <option value="Bug or technical issue">
                    Bug or technical issue
                  </option>
                  <option value="Profile problem">Profile problem</option>
                  <option value="App is not working">App is not working</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="details"
                  className="text-sm font-medium text-slate-200"
                >
                  Issue details
                </label>
                <textarea
                  id="details"
                  required
                  rows="5"
                  placeholder="Describe what happened, where it happened, and what you expected to see."
                  className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-200/50 focus:ring-2 focus:ring-cyan-200/10"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-200">
                  Add a screenshot or file
                </p>
                <button
                  type="button"
                  onClick={() => screenshot.current?.click()}
                  className="mt-2 flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-black/15 px-4 py-6 text-center transition hover:border-cyan-200/50 hover:bg-cyan-300/6 focus:outline-none focus:ring-2 focus:ring-cyan-200/40"
                >
                  <Upload size={20} className="text-cyan-200" />
                  <span className="mt-2 text-sm text-slate-300">
                    {fileName || "Choose a file to attach"}
                  </span>
                  <span className="mt-1 text-xs text-slate-600">
                    PNG, JPG, or PDF
                  </span>
                </button>
                <input
                  ref={screenshot}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </div>

              {submitted && (
                <div className="flex items-start gap-3 rounded-xl border border-emerald-300/20 bg-emerald-300/8 p-3 text-sm text-emerald-100">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  <span>Thanks. Your report has been recorded for review.</span>
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-4 py-3 text-sm font-semibold text-[#211a0b] shadow-[0_8px_24px_rgba(252,211,77,0.18)] transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-[#11131b]"
              >
                Submit report
                <ArrowRight size={17} />
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
export default Report;
