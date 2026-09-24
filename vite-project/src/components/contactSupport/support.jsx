import AsideInfo from "../reportProblem/asside";
import { ArrowRight } from "lucide-react";

function Support() {
  return (
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
      <main className="lg:block lg:w-[50vw]  lg:p-0 lg:mx-auto lg:mr-3.5 w-[90vw] mx-auto ">
        <form className="w-full  rounded-[28px] border border-amber-200/30 bg-[#191919]/90 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-6 lg:mt-4 p-4">
          <div className="mb-6">
            <h2 className="mt-2 text-2xl font-semibold text-amber-50 sm:text-3xl">
              Contact support
            </h2>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col gap-2 text-amber-50">
              <label
                htmlFor="username"
                className="text-sm font-medium text-amber-100"
              >
                Full name
              </label>
              <input
                type="text"
                required
                id="username"
                placeholder="Enter your full name"
                className="w-full rounded-2xl border border-amber-100/15 bg-[#2a2a2a] px-4 py-3 text-sm text-amber-50 placeholder:text-amber-100/45 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
              />
            </div>

            <div className="flex flex-col gap-2 text-amber-50">
              <label
                htmlFor="email"
                className="text-sm font-medium text-amber-100"
              >
                Email address
              </label>
              <input
                type="text"
                id="email"
                required
                placeholder="Enter your email address"
                className="w-full rounded-2xl border border-amber-100/15 bg-[#2a2a2a] px-4 py-3 text-sm text-amber-50 placeholder:text-amber-100/45 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
              />
            </div>

            <div className="flex flex-col gap-2 text-amber-50">
              <label
                htmlFor="number"
                className="text-sm font-medium text-amber-100"
              >
                Phone number
              </label>
              <input
                type="number"
                min={8}
                id="number"
                placeholder="Enter your phone number"
                className="w-full rounded-2xl border border-amber-100/15 bg-[#2a2a2a] px-4 py-3 text-sm text-amber-50 placeholder:text-amber-100/45 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
              />
            </div>

            <div className="flex flex-col gap-2 text-amber-50">
              <label
                htmlFor="explain"
                className="text-sm font-medium text-amber-100"
              >
                Message
              </label>
              <textarea
                id="explain"
                rows="5"
                placeholder="Write your message here"
                className="w-full resize-none rounded-2xl border border-amber-100/15 bg-[#2a2a2a] px-4 py-3 text-sm text-amber-50 placeholder:text-amber-100/45 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
              ></textarea>
            </div>
          </div>

          <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 px-5 py-3 text-sm font-semibold text-[#1a140a] shadow-lg shadow-amber-500/20 transition hover:translate-y-[-1px] hover:shadow-xl hover:shadow-amber-500/25">
            Send message
            <ArrowRight size={16} />
          </button>
        </form>
      </main>
      <AsideInfo />
    </div>
  );
}
export default Support;
