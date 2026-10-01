import { ArrowRight, CheckCircle2, Mail, Upload } from "lucide-react";
import AsideInfo from "./asside";
import { useContext, useRef, useState } from "react";
import UserContext from "../../context/UserContext.jsx";
import api from "../../services/api.js";

function Report() {
  const user = useContext(UserContext);
  const screenshot = useRef(null);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setSubmitted(false);
    setSubmitError("");
    try {
      await api.post("/reports", new FormData(form));
      setSubmitted(true);
      form.reset();
      setFileName("");
    } catch (error) {
      setSubmitError(
        error.response?.data?.message || "Unable to send your report.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (event) => {
    setFileName(event.target.files?.[0]?.name ?? "");
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] w-full px-4 pb-24 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-20 lg:pt-14 ">
      <div className="mx-auto w-full max-w-6xl">
        <div
          className="
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-[minmax(0,1fr)_minmax(250px,300px)]
            lg:items-start
            lg:gap-6
          
           
          "
        >
          {/* FORM */}
          <section
            className="
              order-1
              min-w-0
              rounded-3xl
              lg:w-[45vw]
              lg:block
              lg:mx-auto
              lg:mr-6
              border border-white/10
              bg-[#05070b]/90
              p-5
              shadow-[0_24px_70px_rgba(0,0,0,0.35)]
              backdrop-blur-xl backdrop-saturate-150
              bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)]
              sm:p7
              md:p-8
               md:w-[70vw]
               md:block
               md:mx-auto
            "
          >
            <div className="mb-7 flex items-start justify-between gap-4 ">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">
                  Send a report
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  What can we improve?
                </h2>
              </div>

              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 sm:flex">
                <ArrowRight size={18} />
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div>
                <label
                  htmlFor="reporter"
                  className="text-sm font-medium text-slate-200"
                >
                  Reporting as
                </label>

                <div className="mt-2 flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 transition focus-within:border-cyan-200/50 focus-within:ring-2 focus-within:ring-cyan-200/10">
                  <Mail size={18} className="shrink-0 text-slate-500" />

                  <p
                    id="reporter"
                    className="min-w-0 flex-1 truncate py-3 text-sm text-slate-300"
                  >
                    {user?.email || "Your signed-in account"}
                  </p>
                </div>
              </div>

              {/* ISSUE TYPE */}
              <div>
                <label
                  htmlFor="issue"
                  className="text-sm font-medium text-slate-200"
                >
                  Issue type
                </label>

                <select
                  required
                  name="type"
                  id="issue"
                  defaultValue=""
                  className="
                    mt-2
                    w-full
                    max-w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-[#11131b]
                    px-3
                    py-3
                    text-sm
                    text-slate-200
                    outline-none
                    transition
                    focus:border-cyan-200/50
                    focus:ring-2
                    focus:ring-cyan-200/10
                  "
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

              {/* DETAILS */}
              <div>
                <label
                  htmlFor="details"
                  className="text-sm font-medium text-slate-200"
                >
                  Issue details
                </label>

                <textarea
                  id="details"
                  name="reason"
                  required
                  rows={5}
                  placeholder="Describe what happened, where it happened, and what you expected to see."
                  className="
                    mt-2
                    min-h-32.5
                    w-full
                    max-w-full
                    resize-y
                    rounded-xl
                    border
                    border-white/10
                    bg-black/20
                    px-3
                    py-3
                    text-sm
                    leading-6
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-600
                    focus:border-cyan-200/50
                    focus:ring-2
                    focus:ring-cyan-200/10
                  "
                />
              </div>

              {/* FILE */}
              <div>
                <p className="text-sm font-medium text-slate-200">
                  Add a screenshot or file
                </p>

                <button
                  type="button"
                  onClick={() => screenshot.current?.click()}
                  className="
                    mt-2
                    flex
                    min-h-32.5
                    w-full
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-dashed
                    border-white/20
                    bg-black/15
                    px-4
                    py-6
                    text-center
                    transition
                    hover:border-cyan-200/50
                    hover:bg-cyan-300/6
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-200/40
                  "
                >
                  <Upload size={20} className="shrink-0 text-cyan-200" />

                  <span className="mt-2 max-w-full truncate text-sm text-slate-300">
                    {fileName || "Choose a file to attach"}
                  </span>

                  <span className="mt-1 text-xs text-slate-600">
                    PNG, JPG, or PDF
                  </span>
                </button>

                <input
                  ref={screenshot}
                  type="file"
                  name="attachment"
                  accept="image/png,image/jpeg,.png,.jpg,.jpeg,.pdf,application/pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </div>

              {/* SUCCESS MESSAGE */}
              {submitted && (
                <div className="flex items-start gap-3 rounded-xl border border-emerald-300/20 bg-emerald-300/8 p-3 text-sm text-emerald-100">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />

                  <span className="min-w-0">
                    Thanks. Your report has been recorded for review.
                  </span>
                </div>
              )}

              {submitError && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-300/20 bg-rose-300/8 p-3 text-sm text-rose-100"
                >
                  {submitError}
                </p>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={submitting}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-amber-300
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-[#211a0b]
                  shadow-[0_8px_24px_rgba(252,211,77,0.18)]
                  transition
                  hover:bg-amber-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-amber-200
                  focus:ring-offset-2
                  focus:ring-offset-[#11131b]
                "
              >
                {submitting ? "Sending report..." : "Submit report"}
                <ArrowRight size={17} />
              </button>
            </form>
          </section>
          <AsideInfo />
        </div>
      </div>
    </main>
  );
}

export default Report;
