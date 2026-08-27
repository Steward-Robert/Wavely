import { Home, User, Plus, Bookmark, Settings } from "lucide-react";

function BMenu() {
  return (
    <div className=" bottom-0 border-2  h-14 z-50 sticky bg-black/60 rounded-xl sm:mx-6 lg:hidden md:hidden">
      <div className="flex justify-between mx-5">
        <Home
          className="relative top-4 cursor-pointer"
          color="white"
          size={28}
        />
        <User
          className="relative top-4 cursor-pointer"
          color="white"
          size={28}
        />
        <div className="p-2 bg-white/30 rounded-full">
          <Plus className="cursor-pointer" color="white" size={28} />
        </div>
        <Bookmark
          className="relative top-4 cursor-pointer"
          color="white"
          size={28}
        />
        <Settings className="relative top-4 cursor-pointer" color="white" />
      </div>
    </div>
  );
}

export default BMenu;
