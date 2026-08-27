import { Image, Video, SendHorizonal } from "lucide-react";

function ShareSM() {
  return (
    <div className=" mx-2 mt-10 overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] p-2 shadow-2xl shadow-black/20 backdrop-blur-xs backdrop-saturate-150 sm:p-5 md:w-xl md:block md:mx-auto sm:w-[80vw] sm:block sm:mx-auto">
      <div className="flex">
        <div className="h-10 w-10 border-white/80 border-1 rounded-full mx-3 ml-3">
          <img
            src="1787604938678.png"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <input
          type="text"
          placeholder="Share something special..."
          className="border-none outline-none w-60 text-amber-50 overflow-auto"
        />
      </div>
      <div className="flex gap-2.5 mt-6 justify-between">
        <div className="flex gap-4">
          <Image className="cursor-pointer" color="White" />
          <Video className="cursor-pointer" color="White" />
        </div>
        <SendHorizonal className="cursor-pointer mr-2 mb-1" color="White" />
      </div>
    </div>
  );
}

export default ShareSM;
