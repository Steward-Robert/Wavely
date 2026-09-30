import { AlertTriangle, X } from "lucide-react";

function ConfirmDialog({ dialog, busy, onClose, onConfirm }) {
  if (!dialog) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-confirm-title"
        className="w-full max-w-md rounded-2xl border border-white/12 bg-[#10121a]/95 p-5 shadow-[0_28px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-6"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-300/20 bg-rose-300/10 text-rose-200">
            <AlertTriangle size={21} />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id="admin-confirm-title"
              className="text-lg font-semibold text-white"
            >
              {dialog.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {dialog.description}
            </p>
          </div>
          <button
            type="button"
            title="Close confirmation"
            aria-label="Close confirmation"
            disabled={busy}
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/8 hover:text-white disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={busy}
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/6 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={onConfirm}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-60 ${
              dialog.danger
                ? "bg-rose-300/15 text-rose-100 hover:bg-rose-300/25"
                : "bg-cyan-200 text-[#071014] hover:bg-cyan-100"
            }`}
          >
            {busy ? "Working..." : dialog.confirmLabel || "Confirm"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmDialog;
