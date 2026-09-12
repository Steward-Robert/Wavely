import { EyeClosed, Eye, User, KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import Loader from "../loader";
import { useNavigate } from "react-router";

function Register({ setIsLogin }) {
  const navigate = useNavigate();

  const [isClosed, setIsClosed] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: userName,
          email: userEmail,
          password: userPassword,
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log("messages:", error.message);
      console.log("code:", error.code);
      console.log("status:", error.response?.status);
      console.log("data:", error.response?.data);
    } finally {
      navigate("/feeds");
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-white">
      <h2 className="text-3xl font-bold mb-6 text-center ">Register</h2>

      <div className="flex items-center gap-6">
        {loading && <Loader />}
        {/* Formulaire Principal */}
        <form className="flex-1 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <User className="mb-2.5 ml-5 " color="gray" />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your full name"
              required
              minLength={10}
              className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-300  transition-colors ml-3.5"
            />
          </div>

          <div className="flex items-center">
            <Mail className="mb-2.5 ml-5 " color="gray" />
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Your Email"
              required
              pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
              minLength={10}
              className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-300 transition-colors ml-3.5"
            />
          </div>

          <div className="flex items-center">
            <KeyRound className="mb-2.5 ml-5 " color="gray" />
            <input
              type={isClosed ? "password" : "text"}
              placeholder="Choose a password"
              required
              minLength={8}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-300 transition-colors ml-3.5"
            />
            {isClosed ? (
              <EyeClosed
                className="mb-2.5 mr-5 cursor-pointer"
                onClick={() => setIsClosed(!isClosed)}
                color="gray"
              />
            ) : (
              <Eye
                className="mb-2.5 mr-5 cursor-pointer"
                onClick={() => setIsClosed(!isClosed)}
                color="gray"
              />
            )}
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-orange-300 hover:bg-orange-500 text-white font-medium py-2.5 rounded-sm transition-colors text-sm cursor-pointer"
          >
            Join us
          </button>
          <p className="text-xs text-center text-gray-400 mt-2">
            Already a Member ?
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="text-orange-300 hover:underline ml-2 cursor-pointer"
            >
              Sign in here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
