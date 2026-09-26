import Button from "../addFriendsbutton";
import { Search } from "lucide-react";
import { useState } from "react";

function RSidebar({ alluser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchingUsers = (alluser ?? []).filter((user) =>
    (user.name ?? "").toLowerCase().includes(normalizedSearch),
  );

  return (
    <aside className="fixed right-3 top-24 z-40 hidden h-[calc(100vh-8rem)] w-64 overflow-y-auto scrollbar-none lg:top-28 lg:block xl:w-72">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h2 className="sticky top-0 z-30 mb-3 rounded-xl border-b border-white/10 bg-black/20 px-3 py-4 text-center text-xl font-semibold tracking-tight text-amber-100 backdrop-blur-xl">
          Add some friends
        </h2>
        <label className="mb-3 flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-black/25 px-3 text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition focus-within:border-amber-100/45 focus-within:ring-2 focus-within:ring-amber-100/10">
          <Search size={15} aria-hidden="true" />
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
            <main
              key={users?.id}
              className="mb-2 flex h-14 items-center justify-between rounded-xl border border-transparent px-2 transition duration-300 hover:-translate-x-2 hover:border-amber-200/20 hover:bg-white/8"
            >
              <div className="flex min-w-0 items-center gap-2">
                <div className="h-10 w-10 shrink-0 rounded-full border border-amber-100/30 bg-white/10 p-0.5">
                  <img
                    src={users?.avatars?.[0]?.avatar || "pfp ideas 🌑.jpg"}
                    alt={users?.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h2 className="truncate text-base font-medium text-white">
                  {users?.name}
                </h2>
              </div>

              <Button />
            </main>
          );
        })}
        {matchingUsers.length === 0 && (
          <p className="px-2 py-5 text-center text-sm text-slate-400">
            {normalizedSearch ? "No matching people found." : "No people to show yet."}
          </p>
        )}
      </div>
    </aside>
  );
}
export default RSidebar;
