import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router";

function FriendB({ usersId, compact = false, className = "" }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      aria-label="View profile"
      title="View profile"
      disabled={!usersId}
      className={`${compact ? "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] text-slate-300 transition hover:border-amber-200/30 hover:bg-amber-200/10 hover:text-amber-100" : "cursor-pointer"} ${className} disabled:cursor-not-allowed disabled:opacity-40`}
      onClick={() => navigate(`/user/${encodeURIComponent(usersId)}`)}
    >
      <EllipsisVertical
        size={compact ? 16 : 20}
        color="gray"
        aria-hidden="true"
      />
    </button>
  );
}

export default FriendB;
