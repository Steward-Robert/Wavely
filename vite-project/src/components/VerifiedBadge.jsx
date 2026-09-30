import { BadgeCheck } from "lucide-react";

function VerifiedBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-cyan-200/40 bg-linear-to-br from-cyan-300 via-sky-400 to-blue-500 text-white shadow-[0_0_18px_rgba(56,189,248,0.45)] ${className}`}
      aria-label="Verified admin account"
      title="Verified admin"
    >
      <BadgeCheck
        size={14}
        className="drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
      />
    </span>
  );
}

export default VerifiedBadge;
