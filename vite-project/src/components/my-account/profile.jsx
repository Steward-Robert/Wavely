import { Plus } from "lucide-react";
import PersonalInfo from "./personalInfo";

function Profil() {
  return (
    <main className="w-[90vw] mx-auto bg-black/60 border-2 border-white/40 rounded-2xl lg:w-[50vw]">
      <div className="mt-8">
        <h1 className="text-white text-center text-2xl">My account</h1>
        <div className=" w-[120px] h-[120px] rounded-full mx-auto mt-5 relative">
          <img
            src="0d75a22d7631a18a312d136e5f199b66.jpg"
            className="object-cover w-full h-full rounded-full"
          />
          <Plus
            className="absolute bottom-0 right-0 bg-black/90 rounded-full cursor-pointer hover:rotate-360 duration-700 hover:bg-blue-400 hover:p-2.5"
            color="white"
            size={36}
          />
        </div>
        <div className="text-white flex justify-between text-center w-[75vw] block mx-auto mt-9 lg:w-[40vw]">
          <div className="flex flex-col gap-1 border-r-2 border-white/10 pr-6 hover:text-xl duration-500">
            12
            <p className="text-white/45">Friends</p>
          </div>

          <div className="flex flex-col gap-1 hover:text-xl duration-500 border-r-2 border-white/10 pr-6">
            5<p className="text-white/45 ">Post</p>
          </div>

          <div className="flex flex-col gap-1 pr-4 hover:text-xl duration-500 border-r-2 border-white/10 pr-6">
            120
            <p className="text-white/45">Likes</p>
          </div>
        </div>
      </div>
      <PersonalInfo />
    </main>
  );
}
export default Profil;
