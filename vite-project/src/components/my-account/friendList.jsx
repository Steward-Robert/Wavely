import friends from "../../data/friends";

function FriendList() {
  return (
    <div className=" overflow-auto scrollbar-none bg-white/5 rounded-2xl h-30 lg:w-[40vw] lg:mx-auto lg:block lg:h-auto">
      <div className="text-white flex justify-between px-2 mb-5"></div>
      <main className="flex">
        {friends.map((friend) => {
          return (
            <div
              key={friend.id}
              className="flex flex-col  w-[80px] items-center ml-3 cursor-pointer hover:-translate-y-2.5  duration-500"
            >
              <div className="w-[60px] h-[60px] rounded-full border-2 border-white/40">
                <img
                  src={friend.img}
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
