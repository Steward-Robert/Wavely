import { useState } from "react";
import { EyeClosed, Eye, Mail, KeyRound } from "lucide-react";
import axios from "axios";
import Loader from "../loader";
import { useNavigate } from "react-router";

function Login({ setIsLogin }) {
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: userEmail,
          password: userPassword,
        },
      );
      navigate("/feeds");
      console.log(response.data);
    } catch (error) {
      console.log("messages:", error.message);
      console.log("code:", error.code);
      console.log("status:", error.response?.status);
      console.log("data:", error.response?.data);
      setLogin(error.response?.data.message);
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
        <form className="flex-1 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <Mail className="mb-2.5 ml-5 " color="gray" />
            <input
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-300 transition-colors ml-3.5"
            />
          </div>

          <div className="flex items-center">
            <KeyRound className="mb-2.5 ml-5 " color="gray" />
            <input
              type={isClosed ? "password" : "text"}
              placeholder="Password"
              required
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
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
          <div className="text-red-200 text-center"> {login}</div>

          <button
            type="submit"
            className="mt-4 w-full bg-orange-300 hover:bg-orange-500 text-white font-medium py-2.5 rounded-sm transition-colors text-sm cursor-pointer"
          >
            Join us
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
