function Login({ setIsLogin }) {
  return (
    <div className="w-full text-white">
      <h2 className="text-3xl font-bold mb-6 text-center ">Login</h2>

      <div className="flex items-center gap-6">
        {/* Formulaire Principal */}
        <form className="flex-1 flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-300 transition-colors"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-300 transition-colors"
          />

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
