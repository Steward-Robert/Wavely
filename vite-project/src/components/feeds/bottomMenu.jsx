import { Home, Users, Plus, Bookmark, Settings } from "lucide-react";
import { useNavigate } from "react-router";

function BMenu() {
  const navigate = useNavigate();
  return (
    <div className="  sticky bottom-0 border-2  h-14 z-50  bg-black/60 rounded-xl sm:mx-6 lg:hidden md:hidden">
      <div className="flex justify-between mx-5">
        <div className="flex flex-col gap-1 items-center ">
          <Home
            className="relative top-2 cursor-pointer"
            color="white"
            size={28}
            onClick={() => navigate("/feeds")}
          />
          <p className="text-white mt-1 text-[13px]">Home</p>
        </div>
        <div className="flex flex-col gap-1 items-center ">
          <Users
            className="relative top-2 cursor-pointer"
            color="white"
            size={28}
            onClick={() => navigate("/fr")}
          />
          <p className="text-white mt-1 text-[13px]">Friends</p>
        </div>

        <div className="p-2 h-11 bg-white/30 rounded-full">
          <Plus
            className="cursor-pointer"
            color="white"
            size={28}
            onClick={() => navigate("/pst")}
          />
        </div>

        <div className="flex flex-col gap-1 items-center ">
          <Bookmark
            className="relative top-2 cursor-pointer"
            color="white"
            size={28}
          />
          <p className="text-white text-[12px] mt-1">Saved</p>
        </div>

        <div className="flex flex-col gap-1 items-center ">
          <Settings
            className="relative top-2 cursor-pointer"
            color="white"
            onClick={() => navigate("/settigns")}
          />
          <p className="text-white text-[12px] mt-1">Settings</p>
        </div>
      </div>
    </div>
  );
}

export default BMenu;
