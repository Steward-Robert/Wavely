import { Camera, FileText, Heart, LoaderCircle, Users } from "lucide-react";
import PersonalInfo from "./personalInfo";
import { useEffect, useRef, useState } from "react";
import api from "../../services/api.js";
import VerifiedBadge from "../VerifiedBadge.jsx";
import ProfilePosts from "./ProfilePosts.jsx";
import fetchLikesReceived from "../../utils/profileLikes.js";

const MAX_AVATAR_FILE_SIZE = 10 * 1024 * 1024;
const MAX_AVATAR_DIMENSION = 512;

const optimizeImage = (file) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    const sourceUrl = URL.createObjectURL(file);

    image.onload = () => {
      const scale = Math.min(
        1,
        MAX_AVATAR_DIMENSION / Math.max(image.width, image.height),
      );
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      URL.revokeObjectURL(sourceUrl);

      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("Could not prepare image for upload."));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not prepare image for upload."));
            return;
          }
          resolve(new File([blob], "avatar.jpg", { type: "image/jpeg" }));
        },
        "image/jpeg",
        0.84,
      );
    };
    image.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      reject(new Error("Could not read this image file."));
    };
    image.src = sourceUrl;
  });

function Profil({ user, setUser, allUsers = [] }) {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarStatus, setAvatarStatus] = useState("idle");
  const [avatarMessage, setAvatarMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState("");
  const [likesReceived, setLikesReceived] = useState(null);

  const changeProfil = useRef(null);
  const uploadInProgress = useRef(false);
  const previewUrl = useRef(null);
  const handleChangeProfile = () => {
    if (!loading) changeProfil.current?.click();
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) return undefined;

    const warnBeforeLeaving = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [loading]);

  useEffect(
    () => () => {
      if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    },
    [],
  );

  const handleAvatar = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (uploadInProgress.current) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setAvatarStatus("error");
      setAvatarMessage("Choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_AVATAR_FILE_SIZE) {
      setAvatarStatus("error");
      setAvatarMessage("Choose an image that is 10 MB or smaller.");
      return;
    }

    uploadInProgress.current = true;
    setLoading(true);
    setAvatarStatus("preparing");
    setAvatarMessage("Preparing avatar...");
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    previewUrl.current = URL.createObjectURL(file);
    setAvatarPreview(previewUrl.current);
    const formData = new FormData();

    try {
      const optimizedFile = await optimizeImage(file);
      formData.append("image", optimizedFile);
      setAvatarStatus("uploading");
      setAvatarMessage("Uploading avatar...");
      const response = await api.post("/upload", formData, {
        withCredentials: true,
      });
      if (!response.data?.avatar?.avatar) {
        throw new Error("The server did not return a saved avatar.");
      }

      setUser((currentUser) => ({
        ...currentUser,
        avatars: [...(currentUser?.avatars ?? []), response.data.avatar],
      }));

      setAvatarPreview(null);
      URL.revokeObjectURL(previewUrl.current);
      previewUrl.current = null;
      setAvatarStatus("success");
      setAvatarMessage("Avatar saved successfully.");
    } catch (error) {
      setAvatarPreview(null);
      if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
      previewUrl.current = null;
      setAvatarStatus("error");
      setAvatarMessage(
        error.response?.data?.message ||
          error.message ||
          "Avatar upload failed. Please try again.",
      );
    } finally {
      uploadInProgress.current = false;
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
        const response = await api.get(
          `/userInfo/${encodeURIComponent(user.id)}`,
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

  useEffect(() => {
    if (!user?.id) return undefined;

    const controller = new AbortController();
    fetchLikesReceived(user.id, controller.signal)
      .then((total) => setLikesReceived({ userId: user.id, total }))
      .catch((error) => {
        if (!controller.signal.aborted) {
          console.error("Error loading received likes:", error);
        }
      });

    return () => controller.abort();
  }, [user?.id]);

  const stats = [
    { label: "Friends", value: 0, icon: Users },
    {
      label: "Posts",
      value: postsLoading ? (user?._count?.posts ?? "—") : posts.length,
      icon: FileText,
    },
    {
      label: "Likes received",
      value:
        likesReceived && likesReceived.userId === user?.id
          ? likesReceived.total
          : "—",
      icon: Heart,
    },
  ];

  const deleteOwnPost = async (post) => {
    await api.delete(`/post/${post.id}`, {
      withCredentials: true,
    });
    setPosts((currentPosts) =>
      currentPosts.filter((currentPost) => currentPost.id !== post.id),
    );
    setLikesReceived(null);
    try {
      setLikesReceived({
        userId: user.id,
        total: await fetchLikesReceived(user.id),
      });
    } catch (error) {
      console.error("Error refreshing received likes:", error);
    }
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
            <div className="relative h-34 w-34 shrink-0 rounded-full border-2 border-cyan-200/35 p-1 shadow-[0_0_35px_rgba(103,232,249,0.14)] sm:h-32 sm:w-32">
              <img
                src={
                  avatarPreview ??
                  user?.avatars?.at(-1)?.avatar ??
                  "/pfp ideas 🌑.jpg"
                }
                alt="Profile avatar"
                className="h-full w-full rounded-full object-cover"
              />
              {avatarPreview && (
                <span className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-2 py-1 text-[10px] font-medium text-amber-100">
                  Preview · not saved
                </span>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                ref={changeProfil}
                onChange={handleAvatar}
                disabled={loading}
              />
              <button
                type="button"
                aria-label="Change profile photo"
                className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-cyan-200/35 p-1 shadow-[0_0_35px_rgba(103,232,249,0.14)]focus:outline-none focus:ring-2 focus:ring-amber-200 disabled:cursor-not-allowed disabled:opacity-50 bg-black/70"
                onClick={handleChangeProfile}
                disabled={loading}
              >
                {loading ? (
                  <LoaderCircle size={22} className="animate-spin" />
                ) : (
                  <Camera
                    size={24}
                    strokeWidth={2.2}
                    className="hover:rotate-360 duration-700"
                  />
                )}
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
                Sharing moments, meeting people, staying close to your community
                and have fun .
              </p>
              {avatarMessage && !loading && (
                <div
                  role={avatarStatus === "error" ? "alert" : "status"}
                  className={`mt-3 text-sm ${
                    avatarStatus === "error"
                      ? "text-rose-300"
                      : avatarStatus === "success"
                        ? "text-emerald-300"
                        : "text-amber-100"
                  }`}
                >
                  <p>{avatarMessage}</p>
                </div>
              )}
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
          allUsers={allUsers}
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
