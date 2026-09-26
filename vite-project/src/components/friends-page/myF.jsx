import myfriends from "../../data/myFriends";

import FriendB from "../button/friendButton";

function MyF({ searchTerm = "" }) {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchingFriends = myfriends.filter((friend) =>
    friend.name.toLowerCase().includes(normalizedSearch),
  );

  return (
    <div>
      {matchingFriends.map((myFriend) => {
        return (
          <main
            key={myFriend.id}
            className="group flex min-h-[68px] items-center justify-between gap-3 border-b border-white/8 px-2 transition-colors last:border-b-0 hover:bg-white/[0.04]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-full border border-white/15 bg-white/5 p-0.5">
                <img
                  src={myFriend.img}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <h2 className="truncate text-sm font-medium text-white">{myFriend.name}</h2>
            </div>

            <FriendB />
          </main>
        );
      })}
      {matchingFriends.length === 0 && (
        <p className="px-2 py-6 text-center text-sm text-slate-400">
          {normalizedSearch ? "No matching friends found." : "No friends to show yet."}
        </p>
      )}
    </div>
  );
}
export default MyF;
