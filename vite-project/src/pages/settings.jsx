import BMenu from "../components/feeds/bottomMenu.jsx";
import Header from "../components/header.jsx";
import {
  UserRound,
  LogOut,
  BadgeQuestionMark,
  InfoIcon,
  TriangleAlert,
} from "lucide-react";

function Settings() {
  return (
    <>
      <Header />
      <div className=" h-[80vh] my-3 w-[95vw] mx-auto flex justify-center flex-col">
        <div
          className="text-white flex gap-3 mb-6 items-center ml-2
           border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] hover:bg-white/10 h-13  cursor-pointer duration-500 w-[250px] hover:translate-x-2  hover:pl-2.5
        "
        >
          <UserRound color="gray" size={30} />
          <p className="text-xl">Profil Account</p>
        </div>

        <div
          className="text-white flex gap-3 mb-6 items-center ml-2
           border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] hover:bg-white/10 h-13  cursor-pointer duration-500 w-[250px]
           hover:translate-x-2 hover:pl-2.5
        "
        >
          <BadgeQuestionMark color="gray" size={30} />
          <p className="text-xl">Contact support</p>
        </div>

        <div
          className="text-white flex gap-3 mb-6 items-center ml-2
           border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] hover:bg-white/10 h-13  cursor-pointer duration-500 w-[250px] hover:translate-x-2  hover:pl-2.5
        "
        >
          <InfoIcon color="gray" size={30} />

          <p className="text-xl">About Wavely</p>
        </div>

        <div
          className="text-white flex gap-3 mb-6 items-center ml-2
           border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] hover:bg-white/10 h-13  cursor-pointer duration-500 w-[250px] hover:translate-x-2  hover:pl-2.5
        "
        >
          <TriangleAlert color="orange" size={30} />

          <p className="text-xl">Report a problem</p>
        </div>

        <div
          className="text-white flex gap-3 mb-6 items-center ml-2
           border-white/0 md:flex md:gap-1 border-2 hover:border-l-amber-300 hover:border-b-amber-300 rounded-[10px] hover:bg-white/10 h-13  cursor-pointer duration-500 w-[250px] hover:translate-x-2  hover:pl-2.5
        "
        >
          <LogOut color="gray" size={30} />

          <p className="text-xl">LogOut</p>
        </div>
      </div>
      <BMenu />
    </>
  );
}
export default Settings;
