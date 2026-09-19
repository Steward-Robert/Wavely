import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AlertTriangle, LogOut, X } from "lucide-react";

function Popup({ setPopupOpen, setIsLoading }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async (e) => {
    e.preventDefault();

    setIsLoggingOut(true);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
      );

      console.log(response.message);

      navigate("/");
    } catch (error) {
      setError(error.response?.data.message);
    } finally {
      setIsLoggingOut(false);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setPopupOpen(false);
      }}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-white/15 bg-[#11131b]/95 p-5 text-white shadow-[0_25px_90px_rgba(0,0,0,0.55)] sm:p-7"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-200/20 bg-red-300/10 text-red-200">
            <AlertTriangle size={21} />
          </div>
          <button
            type="button"
            aria-label="Close logout dialog"
            onClick={() => setPopupOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/8 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/50"
          >
            <X size={19} />
          </button>
        </div>
        <h2 id="logout-title" className="mt-5 text-xl font-semibold">
          Log out of Wavely?
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          You can always sign back in to return to your conversations and
          community.
        </p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/8 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/50"
            onClick={() => setPopupOpen(false)}
          >
            Stay signed in
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-red-400/90 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-200/60 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={logout}
            disabled={isLoggingOut}
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
        {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
      </div>
    </div>
  );
}

export default Popup;
