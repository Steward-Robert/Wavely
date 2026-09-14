import {
  Code2,
  Compass,
  Copyright,
  Globe,
  Heart,
  Image,
  Info,
  MessageCircle,
  Sparkles,
  UserRound,
  Users,
  Waves,
} from "lucide-react";
import BMenu from "../components/feeds/bottomMenu.jsx";
import Header from "../components/header.jsx";
import LSidebar from "../components/sidebar/leftSidbar.jsx";

const features = [
  {
    title: "Connect",
    description: "Find friends, discover new people, and build your community.",
    icon: Users,
  },
  {
    title: "Share",
    description:
      "Share photos, posts, and moments with the people who matter to you.",
    icon: Image,
  },
  {
    title: "Messages",
    description:
      "Have private conversations and stay connected with your friends.",
    icon: MessageCircle,
  },
  {
    title: "Interact",
    description:
      "Like, comment, and engage with the content shared by your community.",
    icon: Heart,
  },
  {
    title: "Discover",
    description: "Explore new people and discover content from your community.",
    icon: Compass,
  },
  {
    title: "Your Space",
    description: "Manage your profile and make Wavely your own.",
    icon: UserRound,
  },
];

const technologies = [
  "React",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Prisma",
  "Socket.io",
];

function GlassIcon({ children, className = "" }) {
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/8 text-cyan-200 transition-colors group-hover:bg-cyan-300/15 ${className}`}
    >
      {children}
    </div>
  );
}

function FeatureCard({ title, description, icon: Icon }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/5.5 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/9 hover:shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
      <GlassIcon>
        <Icon size={21} strokeWidth={1.7} />
      </GlassIcon>
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </article>
  );
}

function AboutWavely() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090e] text-white">
      <div className="fixed inset-x-0 top-0 z-60">
        <Header />
      </div>
      <LSidebar />

      <main className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-24 sm:px-8 md:px-28 lg:px-36 lg:pt-28 xl:px-48">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-cyan-400/[0.07] blur-3xl" />

        <section className="relative border-b border-white/10 pb-14 text-center sm:pb-20  lg:w-[50vw] lg:block lg:mx-auto">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_35px_rgba(103,232,249,0.12)]">
            <Waves size={28} strokeWidth={1.5} />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
            The Wavely story
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            About Wavely
          </h1>
          <p className="mt-4 text-xl font-medium text-cyan-100 sm:text-2xl">
            Connect. Share. Discover.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Wavely is a social platform built to bring people closer together.
            Share your moments, connect with friends, discover new people, and
            keep your conversations in one place.
          </p>
        </section>

        <section className="border-b border-white/10 py-14 sm:py-20">
          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-10 lg:w-[50vw] lg:block lg:mx-auto">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-8">
              <GlassIcon className="bg-amber-200/10 text-amber-100 group-hover:bg-amber-200/15">
                <Globe size={23} strokeWidth={1.7} />
              </GlassIcon>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-200/80 ">
                  A place to belong
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  What is Wavely?
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 ">
                  Wavely is designed to make social connection simple,
                  enjoyable, and personal. Whether you&apos;re sharing a moment,
                  talking with a friend, or discovering new people, Wavely gives
                  you a place to stay connected and express yourself.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-14 sm:py-20  lg:w-[50vw] lg:block lg:mx-auto">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200/80">
              Made for connection
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Everything you need to stay connected
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        <section className="border-b border-white/10 py-14 sm:py-20  lg:w-[50vw] lg:block lg:mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-200/15 bg-linear-to-br from-cyan-300/12 via-white/4.5 to-amber-200/8 p-7 sm:p-12">
            <Sparkles
              className="absolute right-7 top-7 text-amber-200/60"
              size={22}
            />
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-100/80">
              Our vision
            </p>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Social should make people feel connected, not overwhelmed.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200">
              We believe social platforms should make people feel connected, not
              overwhelmed. Wavely aims to create a simple, welcoming space where
              people can communicate, share, and build meaningful connections.
            </p>
          </div>
        </section>

        <section className="border-b border-white/10 py-14 sm:py-20  lg:w-[50vw] lg:block lg:mx-auto">
          <div className="rounded-3xl border border-amber-200/15 bg-black/20 p-7 text-center shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-200/20 bg-amber-200/10 text-amber-100">
              <Code2 size={25} strokeWidth={1.6} />
            </div>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-amber-200/80">
              Created by
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Robert Steward
            </h2>
            <p className="mt-3 text-base font-medium text-cyan-100">
              Creator &amp; Developer of Wavely
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300">
              Wavely was created by Robert Steward, a self-taught developer
              passionate about building modern web applications and creating
              meaningful digital experiences.
            </p>
          </div>
        </section>

        <section className="border-b border-white/10 py-14 sm:py-16  lg:w-[50vw] lg:block lg:mx-auto">
          <div className="flex items-center gap-3">
            <Code2 className="text-cyan-200" size={21} />
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Built with modern technologies
            </h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-200/30 hover:text-cyan-100"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-5 py-10 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between  lg:w-[50vw] lg:block lg:mx-auto">
          <div className="flex items-center gap-3 lg:mb-7">
            <Info size={18} className="text-cyan-200" />
            <div>
              <p className="font-medium text-slate-200">Wavely</p>
              <p>Version 1.0.0</p>
            </div>
          </div>
          <p className="flex items-center gap-2">
            <Copyright size={16} /> 2026 Wavely. All rights reserved.
          </p>
        </footer>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-60 md:hidden lg:hidden">
        <BMenu />
      </div>
    </div>
  );
}

export default AboutWavely;
