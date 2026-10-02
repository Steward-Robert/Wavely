import { useState } from "react";
import { AlertCircle, EyeClosed, Eye, Mail, KeyRound } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";
import { getAuthErrorMessage } from "./auth-error";
import Loader from "../loader";

function Login({ setIsLogin, onAuthenticated }) {
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = e.currentTarget.elements;
    if (!email.value.trim()) {
      setError("Enter your email address.");
      return;
    }
    if (!password.value) {
      setError("Enter your password.");
      return;
    }
    if (email.validity.typeMismatch) {
      setError("Enter a valid email address, such as name@example.com.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://wavely-backend-7ryc.onrender.com/api/auth/login",
        {
          email: userEmail,
          password: userPassword,
        },
        {
          withCredentials: true,
        },
      );
      onAuthenticated();
      navigate("/feeds");
      console.log(response.data);
    } catch (requestError) {
      setError(getAuthErrorMessage(requestError, "login"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full text-white">
      <h2 className="text-3xl font-bold mb-6 text-center ">Login</h2>

      <div className="flex items-center gap-6">
        {loading && <Loader />}
        {/* Formulaire Principal */}
        <form
          className="flex-1 flex flex-col gap-5"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-md border border-red-400/40 bg-red-950/50 px-3 py-2.5 text-sm leading-5 text-red-100"
            >
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              <span>{error}</span>
            </div>
          )}
          <div className="flex items-center">
            <Mail className="mb-2.5 ml-5 " color="gray" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="off"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
                setError("");
              }}
              required
              className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-300 transition-colors ml-3.5"
            />
          </div>

          <div className="flex items-center">
            <KeyRound className="mb-2.5 ml-5 " color="gray" />
            <input
              type={isClosed ? "password" : "text"}
              placeholder="Password"
              name="password"
              autoComplete="off"
              required
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
                setError("");
              }}
              className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-300 transition-colors ml-3.5"
            />
            {isClosed ? (
              <EyeClosed
                className="mb-2.5 mr-5 cursor-pointer"
                color="gray"
                onClick={() => setIsClosed(!isClosed)}
              />
            ) : (
              <Eye
                className="mb-2.5 mr-5 cursor-pointer"
                color="gray"
                onClick={() => setIsClosed(!isClosed)}
              />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm bg-orange-300 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Join us"}
          </button>
          <p className="text-xs text-center text-gray-400 mt-2">
            Do not have an account yet ?
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="text-orange-300 hover:underline ml-2 cursor-pointer"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
