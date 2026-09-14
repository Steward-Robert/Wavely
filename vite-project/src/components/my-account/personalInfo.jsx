import { User, Mail, Phone } from "lucide-react";
import FriendList from "./friendList";

function PersonalInfo() {
  return (
    <div className=" w-[80vw] block mx-auto mt-10 h-[70vh] w-full">
      <main>
        <p className="text-white my-7 text-center text-xl lg:text-center">
          Personal info
        </p>
        <div className="text-white flex items-center relative h-15 lg:ml-9  ml-2.5">
          <User className="" color="gray" size={35} />
          <p className="absolute text-[13px] top-1 left-13 text-white/40">
            Your name
          </p>
          <p className="absolute bottom-2 left-13 text-sm">Robert Steward</p>
        </div>

        <div className="text-white flex items-center relative h-15 mt-4 lg:ml-9 ml-2.5">
          <Mail className="" color="gray" size={35} />
          <p className="absolute text-[13px] top-1 left-13 text-white/40">
            Email adress
          </p>
          <p className="absolute bottom-2 left-13 text-sm">
            robertsteward@gmail.com
          </p>
        </div>

        <div className="text-white flex items-center relative h-15 mt-2.5 lg:mb-9 lg:ml-9 ml-2.5">
          <Phone className="" color="gray" size={35} />
          <p className="absolute text-[13px] top-1 left-13 text-white/40">
            Phone number
          </p>
          <p className="absolute bottom-2 left-13 text-sm">+(509) 4008 35 03</p>
        </div>
        <div className="text-white flex justify-between mt-9 lg:mx-12 lg:my-5">
          <p className="">Friends</p>
          <p className="cursor-pointer underline underline-offset-4 hover:-translate-1 duration-500">
            View all
          </p>
        </div>
        <FriendList />
      </main>
    </div>
  );
}

export default PersonalInfo;
