import {
  ArrowLeft,
  CalendarDays,
  FileText,
  Heart,
  Users,
  UserRound,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import BMenu from "../components/feeds/bottomMenu";
import Header from "../components/header";
import Loader from "../components/loader";
import LSidebar from "../components/sidebar/leftSidbar";
import VerifiedBadge from "../components/VerifiedBadge.jsx";
import ProfilePosts from "../components/my-account/ProfilePosts.jsx";

function UserProfile({ user }) {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://wavely-backend-7ryc.onrender.com/api/userInfo/${encodeURIComponent(userId)}`,
          {
            withCredentials: true,
            signal: controller.signal,
          },
        );
        setProfile(response.data.user);
      } catch (requestError) {
        if (controller.signal.aborted) return;
        setProfile(null);
        setError(
          requestError.response?.status === 404
            ? "This profile could not be found."
            : "Could not load this profile. Please try again.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadProfile();
    return () => controller.abort();
  }, [userId]);

  const isOwnProfile = Boolean(user?.id && user.id === profile?.id);

  const deleteOwnPost = async (post) => {
    await axios.delete(
      `https://wavely-backend-7ryc.onrender.com/api/post/${post.id}`,
      {
        withCredentials: true,
      },
    );
    setProfile((currentProfile) =>
      currentProfile
        ? {
            ...currentProfile,
            posts: currentProfile.posts.filter(
              (currentPost) => currentPost.id !== post.id,
            ),
          }
        : currentProfile,
    );
  };

  const stats = [
    {
      label: "Friends",
      value: profile?._count?.friends ?? "—",
      icon: Users,
    },
    {
      label: "Posts",
      value: profile?.posts?.length ?? profile?._count?.posts ?? 0,
      icon: FileText,
    },
    { label: "Likes", value: profile?._count?.likes ?? 0, icon: Heart },
    {
      label: "Member since",
      value: profile?.createdAt
        ? new Date(profile.createdAt).getFullYear()
        : "-",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090e] text-white">
      <div className="fixed inset-x-0 top-0 z-50">
        <Header />
      </div>
      <LSidebar />
      <main className="mx-auto w-full max-w-4xl px-4 pb-28 pt-24 sm:px-6 md:px-28 lg:pb-16 lg:pt-28 xl:px-36">
        <Link
          to="/fr"
          aria-label="Back to friends"
          title="Back to friends"
          className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-200/50"
        >
          <ArrowLeft size={19} />
        </Link>

        {loading ? (
          <Loader />
        ) : error ? (
          <section
            role="alert"
            className="rounded-3xl border border-white/10 bg-white/6 px-6 py-16 text-center text-sm text-slate-300"
          >
            {error}
          </section>
        ) : (
          <article className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <section className="relative overflow-hidden border-b border-white/10 px-5 pb-7 pt-7 sm:px-8 sm:pb-9 sm:pt-9">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/80">
                Community profile
              </p>
              <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row">
                <div className="h-28 w-28 shrink-0 rounded-full border-2 border-cyan-200/35 p-1 shadow-[0_0_35px_rgba(103,232,249,0.14)] sm:h-32 sm:w-32">
                  <img
                    src={profile.avatars?.at(-1)?.avatar || "/pfp ideas 🌑.jpg"}
                    alt={`${profile.name}'s profile`}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="min-w-0 text-center sm:text-left">
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <h1 className="wrap-break-word text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {profile.name}
                    </h1>
                    {profile.role === "ADMIN" && <VerifiedBadge />}
                  </div>
                  <p className="mt-1 text-sm text-slate-400">
                    @{profile.name.trim().toLowerCase().replace(/\s+/g, "")}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 divide-x divide-white/10 rounded-2xl border border-white/10 bg-black/15 py-4 sm:grid-cols-4">
                {stats.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex min-w-0 flex-col items-center gap-1 px-1 text-center"
                  >
                    <Icon size={16} className="mb-1 text-cyan-200/75" />
                    <span className="text-lg font-semibold text-white">
                      {value}
                    </span>
                    <span className="text-xs text-slate-400">{label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="px-5 py-7 sm:px-8 sm:py-9">
              <h2 className="mb-4 text-xl font-semibold text-white">
                Personal info
              </h2>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/15">
                <InfoRow icon={UserRound} label="Name" value={profile.name} />
              </div>

              <ProfilePosts
                posts={profile.posts}
                canDelete={isOwnProfile}
                onDelete={deleteOwnPost}
              />
            </section>
          </article>
        )}
      </main>
      <BMenu />
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-b border-white/8 px-4 py-3.5 last:border-b-0 sm:px-5">
      <Icon size={20} className="shrink-0 text-slate-400" strokeWidth={1.8} />
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="break-all text-sm text-slate-100 sm:text-base">{value}</p>
      </div>
    </div>
  );
}

export default UserProfile;
