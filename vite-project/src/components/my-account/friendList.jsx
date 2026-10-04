import { useFriendships } from "../../context/useFriendships";

function FriendList() {
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
          const avatar =
            friend.avatar?.avatar || friend.avatars?.[0]?.avatar;

          return (
            <div
              key={friend.id}
              className="flex flex-col  w-[80px] items-center ml-3 cursor-pointer hover:-translate-y-2.5  duration-500"
            >
              <div className="w-[60px] h-[60px] rounded-full border-2 border-white/40">
                {avatar && (
                  <img
                    src={avatar}
                    alt={friend.name}
                    className="object-cover w-full h-full rounded-full"
                  />
                )}
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
