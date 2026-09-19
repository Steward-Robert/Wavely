import { ChevronRight, Mail, Phone, User } from "lucide-react";
import FriendList from "./friendList";

function PersonalInfo() {
  return (
    <div className="px-5 py-7 sm:px-8 sm:py-9">
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Profile details
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              Personal info
            </h2>
          </div>
          <button
            type="button"
            className="text-xs font-semibold text-cyan-200 transition hover:text-cyan-100 focus:outline-none focus:underline"
          >
            Edit profile
          </button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/15">
          <InfoRow icon={User} label="Name" value="Robert Steward" />
          <InfoRow
            icon={Mail}
            label="Email address"
            value="robertsteward@gmail.com"
          />
          <InfoRow
            icon={Phone}
            label="Phone number"
            value="+(509) 4008 35 03"
          />
        </div>
      </section>
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Friends</h2>
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-semibold text-cyan-200 transition hover:text-cyan-100 focus:outline-none focus:underline"
          >
            View all <ChevronRight size={14} />
          </button>
        </div>
        <FriendList />
      </section>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-b border-white/8 px-4 py-3.5 last:border-b-0 sm:px-5">
      <Icon size={20} className="shrink-0 text-slate-400" strokeWidth={1.8} />
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="truncate text-sm text-slate-100 sm:text-base">{value}</p>
      </div>
    </div>
  );
}

export default PersonalInfo;
