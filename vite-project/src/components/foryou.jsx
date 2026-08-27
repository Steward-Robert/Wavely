import { useState } from "react";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";

const posts = [
  {
    id: 1,
    name: "Maya Chen",
    username: "@maya.chen",
    time: "18 min ago",
    avatar: "1787604938678.png",
    text: "Small moments can make the loudest memories. What is bringing you joy today?",
    image: "1787604938678.png",
    likes: 248,
    comments: 24,
  },
  {
    id: 2,
    name: "Robert Miles",
    username: "@robertmiles",
    time: "1 hr ago",
    avatar: "1787604938678.png",
    text: "A fresh week, a clear mind, and a little more time outside.",
    likes: 96,
    comments: 8,
  },
];

function Foryou() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  const togglePost = (setter, postId) => {
    setter((current) =>
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId],
    );
  };

  return (
    <section className=" mt-8 pb-8 sm:mt-10 md:w-xl md:block md:mx-auto sm: w-[90vw] sm:block sm:mx-auto mx-auto">
      <div className="mb-4 flex items-center justify-between px-1">
        <h2 className="text-2xl font-semibold tracking-wide text-white drop-shadow-md">
          For you
        </h2>
        <button className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/75 backdrop-blur-md transition hover:bg-white/20">
          Latest
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => {
          const isLiked = likedPosts.includes(post.id);
          const isSaved = savedPosts.includes(post.id);

          return (
            <article
              key={post.id}
              className="overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] p-4 shadow-2xl shadow-black/20 backdrop-blur-2xl backdrop-saturate-150 sm:p-5"
            >
              <header className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.name}
                  className="h-11 w-11 rounded-full border border-white/30 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-white">
                    {post.name}
                  </h3>
                  <p className="text-xs text-white/55">
                    {post.username} · {post.time}
                  </p>
                </div>
                <button
                  aria-label={`More options for ${post.name}`}
                  className="rounded-full p-2 text-white/65 transition hover:bg-white/10 hover:text-white"
                >
                  <MoreHorizontal size={19} />
                </button>
              </header>

              <p className="py-4 text-sm leading-6 text-white/85">
                {post.text}
              </p>

              {post.image && (
                <img
                  src={post.image}
                  alt="Shared post"
                  className="max-h-96 w-full rounded-2xl border border-white/10 object-cover"
                />
              )}

              <div className="mt-4 flex items-center gap-2 border-t border-white/15 pt-3">
                <button
                  onClick={() => togglePost(setLikedPosts, post.id)}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs transition ${isLiked ? "bg-rose-400/20 text-rose-200" : "text-white/65 hover:bg-white/10 hover:text-white"}`}
                >
                  <Heart size={17} fill={isLiked ? "currentColor" : "none"} />
                  {post.likes + (isLiked ? 1 : 0)}
                </button>
                <button className="flex items-center gap-2 rounded-full px-3 py-2 text-xs text-white/65 transition hover:bg-white/10 hover:text-white">
                  <MessageCircle size={17} />
                  {post.comments}
                </button>
                <button
                  onClick={() => togglePost(setSavedPosts, post.id)}
                  aria-label={isSaved ? "Remove saved post" : "Save post"}
                  className={`ml-auto rounded-full p-2 transition ${isSaved ? "text-amber-200" : "text-white/65 hover:bg-white/10 hover:text-white"}`}
                >
                  <Bookmark
                    size={17}
                    fill={isSaved ? "currentColor" : "none"}
                  />
                </button>
                <button
                  aria-label="Share post"
                  className="rounded-full p-2 text-white/65 transition hover:bg-white/10 hover:text-white"
                >
                  <Send size={17} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Foryou;
