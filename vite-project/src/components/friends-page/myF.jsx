import { useFriendships } from "../../context/useFriendships";
import FriendB from "../button/friendButton";
import VerifiedBadge from "../VerifiedBadge.jsx";

function getAvatarUrl(user) {
  const avatar = user?.avatar ?? user?.avatars;
  if (typeof avatar === "string") return avatar;
  if (Array.isArray(avatar)) {
    return [...avatar].reverse().map(getAvatarUrl).find(Boolean) || "";
  }
  if (avatar && typeof avatar === "object") {
    return getAvatarUrl(avatar.avatar);
  }
  return "";
}

function MyF({ searchTerm = "", allUsers = [] }) {
  const { friends, friendsLoading, friendsError } = useFriendships();
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchingFriends = friends
    .filter((friend) =>
      (friend.name ?? "").toLowerCase().includes(normalizedSearch),
    )
    .map((friend) => {
      const userRecord = allUsers.find((user) => user.id === friend.id);
      return {
        ...friend,
        avatarUrl:
          getAvatarUrl(friend) || getAvatarUrl(userRecord) || "/pfp ideas 🌑.jpg",
      };
    });

  return (
    <div>
      {friendsLoading && (
        <p role="status" className="px-2 py-6 text-center text-sm text-slate-400">
          Loading friends...
        </p>
      )}
      {friendsError && (
        <p role="alert" className="px-2 py-6 text-center text-sm text-rose-200">
          {friendsError}
        </p>
      )}
      {!friendsLoading && !friendsError && matchingFriends.map((myFriend) => {
        return (
          <main
            key={myFriend.id}
            className="group flex min-h-[68px] items-center justify-between gap-3 border-b border-white/8 px-2 transition-colors last:border-b-0 hover:bg-white/[0.04]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/5 p-0.5">
                <img
                  src={myFriend.avatarUrl}
                  alt={`${myFriend.name || "Friend"}'s profile`}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="flex min-w-0 items-center gap-1.5">
                <h2 className="truncate text-sm font-medium text-white">
                  {myFriend.name}
                </h2>
                {myFriend.role === "ADMIN" && (
                  <VerifiedBadge className="h-4 w-4 shrink-0" />
                )}
              </div>
            </div>

            <FriendB usersId={myFriend.id} />
          </main>
        );
      })}
      {!friendsLoading && !friendsError && matchingFriends.length === 0 && (
        <p className="px-2 py-6 text-center text-sm text-slate-400">
          {normalizedSearch
            ? "No matching friends found."
            : "No friends to show yet."}
        </p>
      )}
    </div>
  );
}
export default MyF;
