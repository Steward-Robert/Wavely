import "./styles/App.css";
import Loader from "./components/loader.jsx";
import Welcome from "../src/pages/welcome.jsx";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Feed from "../src/pages/feed.jsx";
import FriendsPage from "./pages/friends.jsx";
import Post from "./pages/post.jsx";
import Settings from "./pages/settings.jsx";
import ProfilAcc from "./pages/profilAcc.jsx";
import AboutWavely from "./pages/about.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [isloading, setIsLoading] = useState(false);

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
        <Route path="/fr" element={<FriendsPage />} />
        <Route path="pst" element={<Post />} />
        <Route
          path="settigns"
          element={
            <Settings
              isloading={isloading}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route path="account" element={<ProfilAcc />} />
        <Route path="about" element={<AboutWavely />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
