import Register from "../components/home-page/register-form.jsx";
import "../styles/welcome.css";
import Login from "../components/home-page/login.jsx";
import { useState } from "react";

function Welcome({ onAuthenticated }) {
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
            p-4 sm:p-8 md:p-10 lg:p-14
            bg-black/10
          "
        >
          <div>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_35px_rgba(103,232,249,0.12)] overflow-hidden mb-4">
              <img
                src="/Abstract Logo _ For Sale_dm @logostrife if you….jpg"
                alt="Wavely logo"
                className="object-cover h-full w-full"
              />
            </div>

            <h1
              className="
              mb-6
              text-3xl sm:text-4xl lg:text-4xl
              font-bold tracking-wide
            "
            >
              Welcome to Wavely
            </h1>
          </div>

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
            <Login setIsLogin={setIsLogin} onAuthenticated={onAuthenticated} />
          ) : (
            <Register
              setIsLogin={setIsLogin}
              onAuthenticated={onAuthenticated}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
