import Register from "../components/register-form";
import "../styles/welcome.css";
import Login from "../components/login.jsx";
import { useState } from "react";

function Welcome() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div
      id="welcome"
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-4 sm:p-6"
    >
      <div
        className="
          flex w-full max-w-5xl flex-col overflow-hidden
          rounded-2xl shadow-2xl
          bg-black/30 backdrop-blur-sm
          text-white
          md:flex-row
        "
      >
        <div
          className="
            flex flex-1 flex-col justify-center
            p-8 sm:p-10 md:p-14 lg:p-16
            bg-black/10
          "
        >
          <h1
            className="
              mb-6
              text-3xl sm:text-4xl lg:text-4xl
              font-bold tracking-wide
            "
          >
            Welcome to Wavely
          </h1>

          <p
            className="
              max-w-md
              text-sm sm:text-base
              leading-7
              text-gray-300
            "
          >
            A place to connect, share your thoughts, discover new ideas, and
            meet people who share your interests. Create your account and start
            making your wave today.
          </p>
        </div>
        <div
          className="
            w-full
            bg-black/75
            p-8 sm:p-10 md:p-12 lg:p-14
            md:w-1/2
            flex flex-col justify-center
          "
        >
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
