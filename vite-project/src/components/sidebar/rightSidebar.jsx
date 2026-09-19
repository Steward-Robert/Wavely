import Button from "../addFriendsbutton";
import friends from "../../data/friends";

function RSidebar() {
  return (
    <aside className="fixed right-3 top-24 z-40 hidden h-[calc(100vh-8rem)] w-64 overflow-y-auto scrollbar-none lg:top-28 lg:block xl:w-72">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h2 className="sticky top-0 z-30 mb-3 rounded-xl border-b border-white/10 bg-black/20 px-3 py-4 text-center text-xl font-semibold tracking-tight text-amber-100 backdrop-blur-xl">
          You may know
        </h2>
        {friends.map((friend) => {
          return (
            <main
              key={friend.id}
              className="mb-2 flex h-14 items-center justify-between rounded-xl border border-transparent px-2 transition duration-300 hover:-translate-x-2 hover:border-amber-200/20 hover:bg-white/8"
            >
              <div className="flex min-w-0 items-center gap-2">
                <div className="h-10 w-10 shrink-0 rounded-full border border-amber-100/30 bg-white/10 p-0.5">
                  <img
                    src={friend.img}
                    alt={friend.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h2 className="truncate text-base font-medium text-white">
                  {friend.name}
                </h2>
              </div>

              <Button />
            </main>
          );
        })}
      </div>
    </aside>
  );
}
export default RSidebar;
