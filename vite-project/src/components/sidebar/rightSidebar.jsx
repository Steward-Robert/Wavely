import { CirclePlus, Check } from "lucide-react";
import { useState } from "react";

function RSidebar() {
  const [sendInv, setSendInv] = useState(false);

  return (
    <div className="fixed top-27 right-1   h-12 w-80 hidden sm:hidden md:block md:h-96 md:w-45 lg:w-60 xl:block xl:w-70">
      <div className="bg-black/50 border-l-amber-300 border-2 rounded-sm">
        <h2 className="text-amber-50 text-center mb-3 text-2xl underline underline-offset-7">
          You may know
        </h2>
        <main className="flex justify-between items-center mb-4 ">
          <div className="flex items-center gap-1">
            <div className="h-10 w-10 rounded-full border-2 border-white/20 ml-3">
              <img
                src="1787604938678.png"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <h2 className="text-white ml-1">Steward Robert</h2>
          </div>

          <div className="mr-4">
            {sendInv ? (
              <Check
                color="gray"
                onClick={() => setSendInv(!sendInv)}
                className="cursor-pointer"
                size={30}
              />
            ) : (
              <CirclePlus
                className="cursor-pointer"
                color="gray"
                size={30}
                onClick={() => setSendInv(!sendInv)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
export default RSidebar;
