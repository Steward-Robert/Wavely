import { Plus, FileText, Heart, Users } from "lucide-react";
import PersonalInfo from "./personalInfo";
import { useRef } from "react";

function Profil() {
  const stats = [
    { label: "Friends", value: "12", icon: Users },
    { label: "Posts", value: "5", icon: FileText },
    { label: "Likes", value: "120", icon: Heart },
  ];

  const changeProfil = useRef(null);
  const handleChangeProfile = () => {
    changeProfil.current.click();
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-28 pt-24 sm:px-6 md:px-28 lg:pb-16 lg:pt-28 xl:px-36">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <section className="relative overflow-hidden border-b border-white/10 px-5 pb-7 pt-7 sm:px-8 sm:pb-9 sm:pt-9">
          <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-cyan-300/8 blur-3xl" />
          <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/80">
            Your space
          </p>
          <div className="relative mt-5 flex flex-col items-center gap-5 sm:flex-row sm:items-center">
            <div className="relative h-28 w-28 shrink-0 rounded-full border-2 border-cyan-200/35 p-1 shadow-[0_0_35px_rgba(103,232,249,0.14)] sm:h-32 sm:w-32">
              <img
                src="/0d75a22d7631a18a312d136e5f199b66.jpg"
                alt="Robert Steward"
                className="h-full w-full rounded-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={changeProfil}
              />
              <button
                type="button"
                aria-label="Change profile photo"
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-amber-100/50 bg-amber-300 text-[#211a0b] shadow-lg transition hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-200 cursor-pointer duration-700"
                onClick={handleChangeProfile}
              >
                <Plus
                  size={24}
                  strokeWidth={2.2}
                  className="hover:rotate-360 duration-700"
                />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Robert Steward
              </h1>
              <p className="mt-1 text-sm text-slate-400">@robertsteward</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                Sharing moments, meeting people, and staying close to my
                community.
              </p>
            </div>
          </div>

          <div className="relative mt-8 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-black/15 py-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon size={16} className="mb-1 text-cyan-200/75" />
                <span className="text-lg font-semibold text-white">
                  {value}
                </span>
                <span className="text-xs text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </section>
        <PersonalInfo />
      </div>
    </main>
  );
}
export default Profil;
