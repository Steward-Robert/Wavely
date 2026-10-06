import FriendRB from "../button/friendRButton";
import { useFriendships } from "../../context/useFriendships";
import VerifiedBadge from "../VerifiedBadge.jsx";

function FQ({ searchTerm = "", allUsers = [] }) {
  const {
    receivedRequests: requests,
    requestsLoading,
    requestsError,
  } = useFriendships();
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchingRequests = requests.filter((friendRequest) =>
    (friendRequest.sender?.name ?? "")
      .toLowerCase()
      .includes(normalizedSearch),
  );

  return (
    <div>
      {requestsLoading && (
        <p role="status" className="px-2 py-6 text-center text-sm text-slate-400">
          Loading friend requests...
        </p>
      )}
      {requestsError && (
        <p role="alert" className="px-2 py-6 text-center text-sm text-rose-200">
          {requestsError}
        </p>
      )}
      {!requestsLoading &&
        !requestsError &&
        matchingRequests.map((re) => (
          <main
            key={re.id}
            className="group flex min-h-[68px] items-center justify-between gap-3 border-b border-white/8 px-2 transition-colors last:border-b-0 hover:bg-white/[0.04]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-full border border-white/15 bg-white/5 p-0.5">
                {re.sender?.avatar?.avatar && (
                  <img
                    src={re.sender.avatar.avatar}
                    alt={re.sender.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                )}
              </div>
              <div className="flex min-w-0 items-center gap-1.5">
                <h2 className="truncate text-sm font-medium text-white">
                  {re.sender?.name}
                </h2>
                {(re.sender?.role ||
                  allUsers.find((user) => user.id === re.senderId)?.role) ===
                  "ADMIN" && <VerifiedBadge className="h-4 w-4 shrink-0" />}
              </div>
            </div>

            <FriendRB
              requestId={re.id}
              usersId={re.senderId || re.sender?.id}
            />
          </main>
        ))}
      {!requestsLoading && !requestsError && matchingRequests.length === 0 && (
        <p className="px-2 py-6 text-center text-sm text-slate-400">
          {normalizedSearch
            ? "No matching requests found."
            : "No friend requests yet."}
        </p>
      )}
    </div>
  );
}
export default FQ;
