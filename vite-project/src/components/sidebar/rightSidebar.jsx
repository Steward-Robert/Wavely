import Button from "../addFriendsbutton";
import { Search, UsersRound } from "lucide-react";
import { useState } from "react";
import VerifiedBadge from "../VerifiedBadge.jsx";

function RSidebar({ alluser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchingUsers = (alluser ?? [])
    .filter((user) =>
      (user.name ?? "").toLowerCase().includes(normalizedSearch),
    )
    .sort(
      (firstUser, secondUser) =>
        Number(secondUser.role === "ADMIN") -
        Number(firstUser.role === "ADMIN"),
    );

  return (
    <aside className="fixed right-3 top-24 z-40 hidden h-[calc(100vh-8rem)] w-64 overflow-y-auto scrollbar-none lg:top-28 lg:block xl:w-72">
      <div className="rounded-2xl border border-white/10 bg-[#05070b]/90 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <header className="sticky top-0 z-30 -mx-1 mb-3 border-b border-white/10 bg-[#0a0d12]/90 px-1 pb-4 pt-1 backdrop-blur-xl">
          <div className="mb-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/70">
              Discover
            </p>
          </div>
          <div className="flex items-center gap-2">
            <UsersRound
              size={17}
              className="text-amber-100"
              aria-hidden="true"
            />
            <h2 className="text-lg font-semibold text-white">People to know</h2>
          </div>
        </header>
        <label className="mb-3 flex h-10 items-center gap-2 rounded-xl border border-white/15 bg-black/25 px-3 text-slate-400 transition focus-within:border-amber-100/45 focus-within:ring-2 focus-within:ring-amber-100/10">
          <Search size={15} className="text-amber-100/75" aria-hidden="true" />
          <input
            type="search"
            aria-label="Search users"
            placeholder="Find a friend"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
          />
        </label>
        {matchingUsers.map((users) => {
          return (
            <article
              key={users?.id}
              className="group mb-1 flex min-h-14 items-center gap-2 border-b border-white/[0.06] px-1 py-2 transition-colors last:border-b-0 hover:bg-white/[0.035]"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="h-10 w-10 shrink-0 rounded-full border border-white/10 bg-white/5 p-0.5 transition-colors group-hover:border-amber-200/35">
                  <img
                    src={users?.avatars?.[0]?.avatar || "pfp ideas 🌑.jpg"}
                    alt={users?.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <h2 className="min-w-0 truncate text-base font-medium text-white">
                    {users?.name}
                  </h2>
                  {users?.role === "ADMIN" && (
                    <VerifiedBadge className="h-5 w-5 shrink-0" />
                  )}
                </div>
              </div>

              <Button usersId={users.id} compact />
            </article>
          );
        })}
        {matchingUsers.length === 0 && (
          <p className="px-2 py-7 text-center text-sm leading-5 text-slate-400">
            {normalizedSearch
              ? "No matching people found."
              : "No people to show yet."}
          </p>
        )}
      </div>
    </aside>
  );
}
export default RSidebar;
