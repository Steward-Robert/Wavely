import Button from "../addFriendsbutton";
import friends from "../../data/friends";

function RSidebar() {
  return (
    <div className="fixed top-27 right-1   h-12 w-80 hidden sm:hidden md:block md:h-70 md:w-45 lg:w-50 xl:w-60 xl:block xl:w-70 overflow-y-scroll scrollbar-none md:hidden lg:block">
      <div className="  rounded-2xl ">
        <h2 className="text-amber-50 text-center mb-3 text-2xl underline underline-offset-7 sticky top-0 z-30 bg-black/80 pb-5 rounded-2xl">
          You may know
        </h2>
        {friends.map((friend) => {
          return (
            <>
              <main
                key={friend.id}
                className="flex justify-between items-center mb-4 hover:border-b-2 hover:border-amber-300 rounded-2xl hover:bg-white/10 h-13 duration-300 "
              >
                <div className="flex items-center gap-1">
                  <div className="h-10 w-10 rounded-full border-2 border-white/20 ml-3">
                    <img
                      src={friend.img}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <h2 className="text-white ml-1">{friend.name}</h2>
                </div>

                <Button />
              </main>
              ;
            </>
          );
        })}
      </div>
    </div>
  );
}
export default RSidebar;
