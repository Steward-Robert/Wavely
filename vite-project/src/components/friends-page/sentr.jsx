import sent from "../../data/sentRE.js";
import SentRB from "../button/sentRButton.jsx";
import { EllipsisVertical } from "lucide-react";

function SentR() {
  return (
    <div>
      {sent.map((sent) => {
        return (
          <>
            <main
              key={sent.id}
              className="flex justify-between items-center mb-4 hover:border-b-2 hover:border-amber-300 rounded-2xl hover:bg-white/10 h-13 duration-300 "
            >
              <div className="flex items-center gap-1">
                <div className="h-10 w-10 rounded-full border-2 border-white/20 ml-3">
                  <img
                    src={sent.img}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h2 className="text-white ml-1">{sent.name}</h2>
              </div>
              <div className="flex gap-6">
                <p className="text-white/45">{sent.status}</p>
                {sent.status == "Accepted" ? (
                  <EllipsisVertical
                    color="white"
                    className="cursor-pointer mr-5"
                  />
                ) : (
                  <SentRB />
                )}
              </div>
            </main>
            ;
          </>
        );
      })}
    </div>
  );
}
export default SentR;
