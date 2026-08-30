import { EyeClosed, Eye } from "lucide-react";
import { useState } from "react";

function Register({ setIsLogin }) {
  const [isClosed, setIsClosed] = useState(true);

  return (
    <div className="w-full text-white">
      <h2 className="text-3xl font-bold mb-6 text-center ">Register</h2>

      <div className="flex items-center gap-6">
        {/* Formulaire Principal */}
        <form className="flex-1 flex flex-col gap-5">
          <input
            type="text"
            placeholder="Enter your full name"
            required
            className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-300  transition-colors"
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-300 transition-colors"
          />
          <div className="flex items-center">
            <input
              type={isClosed ? "password" : "text"}
              placeholder="Choose a password"
              required
              className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-300 transition-colors"
            />
            {isClosed ? (
              <EyeClosed
                className="mb-2.5 mr-5 cursor-pointer"
                onClick={() => setIsClosed(!isClosed)}
              />
            ) : (
              <Eye
                className="mb-2.5 mr-5 cursor-pointer"
                onClick={() => setIsClosed(!isClosed)}
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
