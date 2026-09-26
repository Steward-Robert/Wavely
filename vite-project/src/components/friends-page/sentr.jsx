import sent from "../../data/sentRE.js";
import SentRB from "../button/sentRButton.jsx";
import { EllipsisVertical } from "lucide-react";

function SentR({ searchTerm = "" }) {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchingRequests = sent.filter((request) =>
    (request.name ?? "").toLowerCase().includes(normalizedSearch),
  );

  return (
    <div>
      {matchingRequests.map((sent) => {
        return (
          <main
            key={sent.id}
            className="group flex min-h-[68px] items-center justify-between gap-3 border-b border-white/8 px-2 transition-colors last:border-b-0 hover:bg-white/[0.04]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-full border border-white/15 bg-white/5 p-0.5">
                <img
                  src={sent.img}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <h2 className="truncate text-sm font-medium text-white">{sent.name}</h2>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              <p className="text-xs text-white/55 sm:text-sm">{sent.status}</p>
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
        );
      })}
      {matchingRequests.length === 0 && (
        <p className="px-2 py-6 text-center text-sm text-slate-400">
          {normalizedSearch ? "No matching requests found." : "No sent requests yet."}
        </p>
      )}
    </div>
  );
}
export default SentR;
