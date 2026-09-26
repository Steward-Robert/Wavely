import request from "../../data/friendRe";

import FriendRB from "../button/friendRButton";

function FQ({ searchTerm = "" }) {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchingRequests = request.filter((friendRequest) =>
    (friendRequest.name ?? "").toLowerCase().includes(normalizedSearch),
  );

  return (
    <div>
      {matchingRequests.map((re) => {
        return (
          <main
            key={re.id}
            className="group flex min-h-[68px] items-center justify-between gap-3 border-b border-white/8 px-2 transition-colors last:border-b-0 hover:bg-white/[0.04]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-full border border-white/15 bg-white/5 p-0.5">
                <img
                  src={re.img}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <h2 className="truncate text-sm font-medium text-white">{re.name}</h2>
            </div>

            <FriendRB />
          </main>
        );
      })}
      {matchingRequests.length === 0 && (
        <p className="px-2 py-6 text-center text-sm text-slate-400">
          {normalizedSearch ? "No matching requests found." : "No friend requests yet."}
        </p>
      )}
    </div>
  );
}
export default FQ;
