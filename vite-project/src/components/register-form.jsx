function Register() {
  return (
    <div className="w-full text-white">
      <h2 className="text-3xl font-bold mb-6 text-center ">Sign up</h2>

      <div className="flex items-center gap-6">
        {/* Formulaire Principal */}
        <form className="flex-1 flex flex-col gap-5">
          <input
            type="text"
            placeholder="Enter your full name"
            required
            className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
          />

          <input
            type="password"
            placeholder="Choose a password"
            required
            className="w-full bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
          />

          <button
            type="submit"
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-sm transition-colors text-sm"
          >
            Join us
          </button>

          <p className="text-xs text-center text-gray-400 mt-2">
            Already a Member?{" "}
            <a href="#" className="text-emerald-500 hover:underline">
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
