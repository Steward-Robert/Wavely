import { CirclePlus, X } from "lucide-react";
import { useState } from "react";
import { useFriendships } from "../context/useFriendships";
import FriendB from "./button/friendButton";

function Button({ usersId, compact = false }) {
  const {
    friends,
    receivedRequests,
    outgoingRequestIds,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
  } = useFriendships();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isFriend = friends.some((friend) => friend.id === usersId);
  const requestSent = outgoingRequestIds.includes(usersId);
  const receivedRequest = receivedRequests.find(
    (request) => request.senderId === usersId,
  );
  const controlClass = compact
    ? "inline-flex min-h-8 shrink-0 items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/[0.035] px-2 text-xs text-slate-300 transition hover:border-amber-200/30 hover:bg-amber-200/10 hover:text-amber-100"
    : "inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm text-slate-200 transition hover:border-amber-200/30 hover:bg-amber-200/10 hover:text-amber-100";

  const handleClick = async () => {
    if (loading || isFriend || !usersId) return;
    setLoading(true);
    setError("");
    try {
      if (receivedRequest) {
        await acceptFriendRequest(receivedRequest.id);
      } else if (requestSent) {
        await cancelFriendRequest(usersId);
      } else {
        await sendFriendRequest(usersId);
      }
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not update this friend request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        compact
          ? "ml-2 flex shrink-0 items-center gap-1"
          : "ml-3 flex shrink-0 items-center gap-3"
      }
    >
      {isFriend ? (
        <span className="text-xs font-medium text-emerald-200">Friends</span>
      ) : receivedRequest ? (
        <button
          type="button"
          aria-label="Accept"
          title="Accept"
          onClick={handleClick}
          disabled={loading}
          className={controlClass}
        >
          {loading ? "Accepting..." : "Accept"}
        </button>
      ) : requestSent ? (
        <>
          <span className="text-xs text-white/55">Request Sent</span>
          <button
            type="button"
            aria-label="Cancel Request"
            title="Cancel Request"
            onClick={handleClick}
            disabled={loading}
            className={controlClass}
          >
            {loading ? (
              <span aria-live="polite">Cancelling...</span>
            ) : (
              <>
                <X size={compact ? 14 : 16} aria-hidden="true" />
                <span>Cancel Request</span>
              </>
            )}
          </button>
        </>
      ) : (
        <button
          type="button"
          aria-label="Add Friend"
          title="Add Friend"
          onClick={handleClick}
          disabled={loading}
          className={controlClass}
        >
          {loading ? (
            <span aria-live="polite">Sending...</span>
          ) : (
            <>
              <CirclePlus size={compact ? 14 : 16} aria-hidden="true" />
              <span>Add Friend</span>
            </>
          )}
        </button>
      )}
      <FriendB
        usersId={usersId}
        compact={compact}
        className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-white/10 hover:text-amber-100"
      />
      {error && (
        <span role="alert" className="text-xs text-rose-200">
          {error}
        </span>
      )}
    </div>
  );
}

export default Button;
