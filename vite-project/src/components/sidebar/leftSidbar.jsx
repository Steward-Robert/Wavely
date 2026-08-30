import { Home, User, Plus, Bookmark, Settings } from "lucide-react";
import { useNavigate } from "react-router";

function LSidebar() {
  const navigate = useNavigate();
  return (
    <div className="fixed top-20 md:top-30 left-1  w-80 hidden sm:hidden md:block md:h-96 md:w-20 lg:w-60 xl:block xl:w-70 z-50">
      <main className="md:flex md:flex-col md:gap-6 md:relative md:top-5  ">
        <div
          className=" border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] pl-3 hover:bg-white/10 h-13 items-center cursor-pointer duration-500"
          onClick={() => navigate("/feeds")}
        >
          <Home color="gray" size={30} />
          <p className="text-amber-50 md:hidden lg:block lg:ml-5">Home</p>
        </div>
        <div
          className=" border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] pl-3 hover:bg-white/10 h-13 items-center cursor-pointer duration-500"
          onClick={() => navigate("/fr")}
        >
          <User color="gray" size={30} />
          <p className="text-amber-50 md:hidden lg:block lg:ml-5">Friends</p>
        </div>
        <div className=" border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] pl-3 hover:bg-white/10 h-13 items-center cursor-pointer duration-500">
          <div className="md:inline-block  md: bg-white/30 md:rounded-full">
            <Plus className="cursor-pointer" color="white" size={30} />
          </div>
          <p className="text-amber-50 md:hidden lg:block lg:ml-5">
            Create a post
          </p>
        </div>
        <div className=" border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] pl-3 hover:bg-white/10 h-13 items-center cursor-pointer duration-500">
          <Bookmark color="gray" size={30} />
          <p className="text-amber-50 md:hidden lg:block lg:ml-5">Saved</p>
        </div>
        <div className=" border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] pl-3 hover:bg-white/10 h-13 items-center cursor-pointer duration-500">
          <Settings color="gray" size={30} />
          <p className="text-amber-50 md:hidden lg:block lg:ml-5">Settings</p>
        </div>
      </main>
    </div>
  );
}
export default LSidebar;
