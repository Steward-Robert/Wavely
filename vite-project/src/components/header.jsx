import { MessageCircle } from "lucide-react";

function Header() {
  return (
    <div className="flex justify-between items-center border-b-amber-100 border-2 sticky top-0 z-50 bg-black/40 backdrop-blur-xs h-15 rounded-md">
      <div>
        <h1 className="text-2xl mx-3 text-taupe-500 font-medium">
          Wavely <span className="text-amber-300">.</span>
        </h1>
      </div>
      <div className="flex">
        <div className="flex absolute bottom-4 right-17">
          <MessageCircle
            size={27}
            color="gray
        "
          />
        </div>
        <div className="h-10 w-10 border-1 rounded-full mx-3 ml-3  border-white/80 ">
          <img
            src="1787604938678.png"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
export default Header;
