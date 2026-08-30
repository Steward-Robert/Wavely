import myfriends from "../../data/myFriends";

import FriendB from "../button/friendButton";

function MyF() {
  return (
    <div>
      {myfriends.map((myFriend) => {
        return (
          <>
            <main
              key={myFriend.id}
              className="flex justify-between items-center mb-4 hover:border-b-2 hover:border-amber-300 rounded-2xl hover:bg-white/10 h-13 duration-300 "
            >
              <div className="flex items-center gap-1">
                <div className="h-10 w-10 rounded-full border-2 border-white/20 ml-3">
                  <img
                    src={myFriend.img}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h2 className="text-white ml-1">{myFriend.name}</h2>
              </div>

              <FriendB />
            </main>
            ;
          </>
        );
      })}
    </div>
  );
}
export default MyF;
