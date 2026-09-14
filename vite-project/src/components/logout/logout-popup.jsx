import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

function Popup({ setPopupOpen, setIsLoading }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const logout = async (e) => {
    e.preventDefault();

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
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-white text-center border border-white/45 bg-black/80 rounded-2xl w-[80vw] mx-auto block my-6">
        <p className="pt-2">Are you sure you want to logout to your account?</p>

        <div className="flex gap-5 justify-center my-4">
          <button
            className="px-8 py-2 bg-green-500 rounded-2xl cursor-pointer"
            onClick={logout}
          >
            Yes
          </button>

          <button
            className="px-8 py-2 bg-red-500 rounded-2xl cursor-pointer"
            onClick={() => setPopupOpen(false)}
          >
            No
          </button>
        </div>
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    </div>
  );
}

export default Popup;
