import { useFriendships } from "../../context/useFriendships";

function getAvatarUrl(avatar) {
  if (typeof avatar === "string") return avatar;
  if (!avatar) return "";
  if (Array.isArray(avatar)) {
    return [...avatar].reverse().map(getAvatarUrl).find(Boolean) || "";
  }
  return getAvatarUrl(avatar.avatar);
}

function FriendList({ allUsers = [] }) {
  const { friends, friendsLoading, friendsError } = useFriendships();

  return (
    <div className=" overflow-auto scrollbar-none bg-white/5 rounded-2xl h-30 lg:w-[40vw] lg:mx-auto lg:block lg:h-auto">
      <div className="text-white flex justify-between px-2 mb-5"></div>
      <main className="flex">
        {friendsLoading && (
          <p role="status" className="px-3 py-4 text-sm text-slate-400">
            Loading friends...
          </p>
        )}
        {friendsError && (
          <p role="alert" className="px-3 py-4 text-sm text-rose-200">
            {friendsError}
          </p>
        )}
        {!friendsLoading && !friendsError && friends.length === 0 && (
          <p className="px-3 py-4 text-sm text-slate-400">
            No friends to show yet.
          </p>
        )}
        {!friendsLoading && !friendsError && friends.map((friend) => {
          const userRecord = allUsers.find((user) => user.id === friend.id);
          const avatar =
            getAvatarUrl(friend.avatar) ||
            getAvatarUrl(friend.avatars) ||
            getAvatarUrl(userRecord?.avatar) ||
            getAvatarUrl(userRecord?.avatars) ||
            "/pfp ideas 🌑.jpg";

          return (
            <div
              key={friend.id}
              className="flex flex-col  w-[80px] items-center ml-3 cursor-pointer hover:-translate-y-2.5  duration-500"
            >
              <div className="w-[60px] h-[60px] rounded-full border-2 border-white/40">
                <img
                  src={avatar}
                  alt={`${friend.name || "Friend"}'s profile`}
                  onError={(event) => {
                    event.currentTarget.src = "/pfp ideas 🌑.jpg";
                  }}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <p className="text-white w-full text-center truncate text-[14px] mt-1">
                {friend.name}
              </p>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default FriendList;
