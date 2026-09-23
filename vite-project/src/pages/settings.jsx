import BMenu from "../components/feeds/bottomMenu.jsx";
import Header from "../components/header.jsx";
import Popup from "../components/logout/logout-popup.jsx";
import Loader from "../components/loader.jsx";
import LSidebar from "../components/sidebar/leftSidbar.jsx";
import {
  UserRound,
  LogOut,
  BadgeQuestionMark,
  InfoIcon,
  TriangleAlert,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router";

function Settings({ isloading, setIsLoading }) {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);

  const accountItems = [
    {
      label: "My Account",
      description: "Update your profile and personal information",
      icon: UserRound,
      onClick: () => navigate("/account"),
    },
  ];

  const helpItems = [
    {
      label: "Contact support",
      description: "Get help with your Wavely experience",
      icon: BadgeQuestionMark,
    },
    {
      label: "About Wavely",
      description: "Learn more about the community",
      icon: InfoIcon,
      onClick: () => navigate("/about"),
    },
    {
      label: "Report a problem",
      description: "Tell us when something is not working right",
      icon: TriangleAlert,
      onClick: () => navigate("/report"),
      iconClassName: "text-amber-300",
    },
  ];

  function SettingRow({ item }) {
    const Icon = item.icon;

    return (
      <button
        type="button"
        onClick={item.onClick}
        className="group flex w-full items-center gap-3 border-b border-white/8 px-4 py-4 text-left transition last:border-b-0 hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-200/50 sm:px-5"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/6 text-slate-300 transition group-hover:border-cyan-200/25 group-hover:bg-cyan-300/10 group-hover:text-cyan-100">
          <Icon size={20} strokeWidth={1.8} className={item.iconClassName} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-white sm:text-base">
            {item.label}
          </span>
          <span className="mt-1 block text-xs leading-5 text-slate-400 sm:text-sm">
            {item.description}
          </span>
        </span>
        <ChevronRight
          size={18}
          className="shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-200"
        />
      </button>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090e] text-white">
      <div className="fixed inset-x-0 top-0 z-50">
        <Header />
      </div>
      <LSidebar />

      <main className="mx-auto w-full max-w-4xl px-4 pb-28 pt-24 sm:px-6 md:px-28 lg:pb-16 lg:pt-28 xl:px-36">
        {isloading && <Loader />}
        {popupOpen && (
          <Popup setPopupOpen={setPopupOpen} setIsLoading={setIsLoading} />
        )}
        <section className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-start gap-4 sm:mb-10">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_30px_rgba(103,232,249,0.1)]">
              <SlidersHorizontal size={23} strokeWidth={1.7} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/80">
                Your space
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Settings
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
                Manage your account, find support, and shape your Wavely
                experience.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Account
              </h2>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                {accountItems.map((item) => (
                  <SettingRow key={item.label} item={item} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Help and information
              </h2>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                {helpItems.map((item) => (
                  <SettingRow key={item.label} item={item} />
                ))}
              </div>
            </section>

            <button
              type="button"
              onClick={() => setPopupOpen(true)}
              className="group flex w-full items-center gap-3 rounded-2xl border border-red-300/15 bg-red-400/6 px-4 py-4 text-left transition hover:border-red-300/35 hover:bg-red-400/10 focus:outline-none focus:ring-2 focus:ring-red-200/50 sm:px-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200/15 bg-red-300/10 text-red-200">
                <LogOut size={20} strokeWidth={1.8} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-red-100 sm:text-base">
                  Log out
                </span>
                <span className="mt-1 block text-xs text-red-100/55 sm:text-sm">
                  End your current session
                </span>
              </span>
            </button>
          </div>
        </section>
      </main>
      <BMenu />
    </div>
  );
}
export default Settings;
