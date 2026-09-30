import { CirclePlus, Check } from "lucide-react";
import { useState } from "react";
import FriendB from "./button/friendButton";

function Button({ usersId, compact = false }) {
  const [sendInv, setSendInv] = useState(false);
  const controlClass = compact
    ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] text-slate-300 transition hover:border-amber-200/30 hover:bg-amber-200/10 hover:text-amber-100"
    : "cursor-pointer";

  return (
    <div
      className={
        compact
          ? "ml-2 flex shrink-0 items-center gap-1"
          : "ml-3 flex shrink-0 items-center gap-3"
      }
    >
      {sendInv ? (
        <button
          type="button"
          aria-label="Undo friend request"
          title="Undo friend request"
          onClick={() => setSendInv(false)}
          className={controlClass}
        >
          <Check size={compact ? 16 : 30} aria-hidden="true" />
        </button>
      ) : (
        <button
          type="button"
          aria-label="Send friend request"
          title="Send friend request"
          onClick={() => setSendInv(true)}
          className={controlClass}
        >
          <CirclePlus
            size={compact ? 16 : 30}
            color={compact ? "currentColor" : "gray"}
            aria-hidden="true"
          />
        </button>
      )}
      <FriendB usersId={usersId} compact={compact} />
    </div>
  );
}

export default Button;
