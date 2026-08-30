import "./styles/App.css";
import Loader from "./components/loader.jsx";
import Welcome from "../src/pages/welcome.jsx";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Feed from "../src/pages/feed.jsx";
import FriendsPage from "./pages/friends.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loading ? <Loader /> : <Welcome />} />
        <Route path="/feeds" element={<Feed />} />
        <Route path="fr" element={<FriendsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
