import { useFriendships } from "../../context/useFriendships";
import Button from "../addFriendsbutton.jsx";

function SentR({ searchTerm = "" }) {
  const { sentRequests, requestsLoading, requestsError } = useFriendships();
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchingRequests = sentRequests.filter((request) =>
    (request.receiver?.name ?? "").toLowerCase().includes(normalizedSearch),
  );

  return (
    <div>
      {requestsLoading && (
        <p role="status" className="px-2 py-6 text-center text-sm text-slate-400">
          Loading sent requests...
        </p>
      )}
      {requestsError && (
        <p role="alert" className="px-2 py-6 text-center text-sm text-rose-200">
          {requestsError}
        </p>
      )}
      {!requestsLoading &&
        !requestsError &&
        matchingRequests.map((sent) => (
          <main
            key={sent.id}
            className="group flex min-h-[68px] items-center justify-between gap-3 border-b border-white/8 px-2 transition-colors last:border-b-0 hover:bg-white/[0.04]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-full border border-white/15 bg-white/5 p-0.5">
                {sent.receiver?.avatar?.avatar && (
                  <img
                    src={sent.receiver.avatar.avatar}
                    alt={sent.receiver.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                )}
              </div>
              <h2 className="truncate text-sm font-medium text-white">
                {sent.receiver?.name}
              </h2>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              <Button usersId={sent.receiverId} />
            </div>
          </main>
        ))}
      {!requestsLoading &&
        !requestsError &&
        matchingRequests.length === 0 && (
        <p className="px-2 py-6 text-center text-sm text-slate-400">
          {normalizedSearch
            ? "No matching requests found."
            : "No sent requests yet."}
        </p>
      )}
    </div>
  );
}
export default SentR;
