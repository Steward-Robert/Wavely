import UserContext from "./context/UserContext.jsx";
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
import ShowStories from "./components/feeds/showStories.jsx";
import ReportProblem from "./pages/reportProblem.jsx";
import ContactSupport from "./pages/contactSupport.jsx";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [showStory, setShowStory] = useState([]);
  const [user, setUser] = useState(null);
  const [alluser, setAllUser] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch {
        setUser(null);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const loadAllUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users", {
          withCredentials: true,
        });

        setAllUser(response.data.users);
      } catch (error) {
        console.error("USERS ERROR :", error);
        setAllUser([]);
      }
    };

    loadAllUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={loading ? <Loader /> : <Welcome />} />
          <Route
            path="/feeds"
            element={<Feed user={user} alluser={alluser} />}
          />
          <Route path="/fr" element={<FriendsPage allUser={alluser} />} />
          <Route path="pst" element={<Post />} />
          <Route
            path="/stories"
            element={<ShowStories />}
            showStory={showStory}
            setShowStory={setShowStory}
          />
          <Route
            path="settigns"
            element={
              <Settings
                isloading={isloading}
                setIsLoading={setIsLoading}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            path="account"
            element={<ProfilAcc user={user} setUser={setUser} />}
          />
          <Route path="about" element={<AboutWavely />} />
          <Route path="/report" element={<ReportProblem />} />
          <Route path="/contact-support" element={<ContactSupport />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
