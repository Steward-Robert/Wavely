import { Check } from "lucide-react";
import { useState } from "react";
import { useFriendships } from "../../context/useFriendships";
import FriendB from "./friendButton";

function FriendRB({ requestId, usersId }) {
  const { acceptFriendRequest } = useFriendships();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAccept = async () => {
    if (loading || !requestId) return;
    setLoading(true);
    setError("");
    try {
      await acceptFriendRequest(requestId);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not accept this friend request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleAccept}
        disabled={loading || !requestId}
        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-200 transition hover:border-amber-200/30 hover:bg-amber-200/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Check size={16} aria-hidden="true" />
        {loading ? "Accepting..." : "Accept"}
      </button>
      <FriendB usersId={usersId} />
      {error && (
        <span role="alert" className="text-xs text-rose-200">
          {error}
        </span>
      )}
    </div>
  );
}

export default FriendRB;
