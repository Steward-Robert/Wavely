import { Camera, FileText, Heart, Users } from "lucide-react";
import PersonalInfo from "./personalInfo";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import VerifiedBadge from "../VerifiedBadge.jsx";
import ProfilePosts from "./ProfilePosts.jsx";

const optimizeImage = (file) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    const sourceUrl = URL.createObjectURL(file);

    image.onload = () => {
      const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas
        .getContext("2d")
        .drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(sourceUrl);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not optimize image"));
            return;
          }
          resolve(new File([blob], "avatar.jpg", { type: "image/jpeg" }));
        },
        "image/jpeg",
        0.82,
      );
    };
    image.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      reject(new Error("Could not read image"));
    };
    image.src = sourceUrl;
  });

function Profil({ user, setUser }) {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState("");

  const changeProfil = useRef(null);
  const handleChangeProfile = () => {
    changeProfil.current.click();
  };

  const [loading, setLoading] = useState(false);

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    const formData = new FormData();

    try {
      const optimizedFile = await optimizeImage(file);
      formData.append("image", optimizedFile);
      const response = await axios.post(
        "https://wavely-backend-7ryc.onrender.com/api/upload",
        formData,
        {
          withCredentials: true,
        },
      );
      setUser((currentUser) => ({
        ...currentUser,
        avatars: [...(currentUser?.avatars ?? []), response.data.avatar],
      }));

      setAvatarPreview(null);
      URL.revokeObjectURL(previewUrl);
      console.log(response.data);
    } catch (error) {
      setAvatarPreview(null);
      URL.revokeObjectURL(previewUrl);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const controller = new AbortController();

    const loadPosts = async () => {
      setPostsLoading(true);
      setPostsError("");

      try {
        const response = await axios.get(
          `https://wavely-backend-7ryc.onrender.com/api/userInfo/${encodeURIComponent(user.id)}`,
          {
            withCredentials: true,
            signal: controller.signal,
          },
        );
        setPosts(response.data.user.posts ?? []);
      } catch {
        if (!controller.signal.aborted) {
          setPostsError("Could not load your posts. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setPostsLoading(false);
      }
    };

    loadPosts();
    return () => controller.abort();
  }, [user?.id]);

  const stats = [
    { label: "Friends", value: 0, icon: Users },
    {
      label: "Posts",
      value: postsLoading ? (user?._count?.posts ?? "—") : posts.length,
      icon: FileText,
    },
    { label: "Likes", value: user?._count?.likes ?? 0, icon: Heart },
  ];

  const deleteOwnPost = async (post) => {
    await axios.delete(
      `https://wavely-backend-7ryc.onrender.com/api/post/${post.id}`,
      {
        withCredentials: true,
      },
    );
    setPosts((currentPosts) =>
      currentPosts.filter((currentPost) => currentPost.id !== post.id),
    );
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
            <div className="relative h-32 w-32 shrink-0 rounded-full border-2 border-cyan-200/35 p-1 shadow-[0_0_35px_rgba(103,232,249,0.14)] sm:h-32 sm:w-32">
              <img
                src={
                  avatarPreview ??
                  user?.avatars?.at(-1)?.avatar ??
                  "/pfp ideas 🌑.jpg"
                }
                className="h-full w-full rounded-full object-cover"
              />

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={changeProfil}
                onChange={handleAvatar}
              />
              <button
                type="button"
                aria-label="Change profile photo"
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-amber-100/50 bg-amber-300 text-[#211a0b] shadow-lg transition hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-200 cursor-pointer duration-700"
                onClick={handleChangeProfile}
                disabled={loading}
              >
                <Camera
                  size={24}
                  strokeWidth={2.2}
                  className="hover:rotate-360 duration-700"
                />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {user ? user.name : "User"}
                </h1>
                {user?.role === "ADMIN" && <VerifiedBadge />}
              </div>
              <p className="mt-1 text-sm text-slate-400">
                {user
                  ? "@" + user.name.trim().toLowerCase().replace(/\s+/g, "")
                  : "user"}
              </p>
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
        <PersonalInfo
          name={user?.name || "Unknown"}
          email={user?.email || "no email available"}
        />
        <ProfilePosts
          title="Your posts"
          posts={posts}
          loading={postsLoading}
          error={postsError}
          canDelete
          onDelete={deleteOwnPost}
        />
      </div>
    </main>
  );
}
export default Profil;
