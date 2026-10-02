import UserProfile from "./pages/userProfile.jsx";
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
import AdminDashboard from "./pages/adminDashboard.jsx";
import axios from "axios";
import { Navigate } from "react-router";

function App() {
  const [loading, setLoading] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [showStory, setShowStory] = useState([]);
  const [user, setUser] = useState(null);
  const [alluser, setAllUser] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [authVersion, setAuthVersion] = useState(0);

  const refreshAfterAuthentication = () => {
    setAuthVersion((version) => version + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let isCurrent = true;

    const loadUser = async () => {
      try {
        const response = await axios.get(
          "https://wavely-backend-7ryc.onrender.com/api/me",
          {
            withCredentials: true,
          },
        );
        if (isCurrent) setUser(response.data.user);
      } catch {
        if (isCurrent) setUser(null);
      }
    };

    loadUser();
    return () => {
      isCurrent = false;
    };
  }, [authVersion]);

  useEffect(() => {
    let isCurrent = true;

    const loadAllUser = async () => {
      try {
        const response = await axios.get(
          "https://wavely-backend-7ryc.onrender.com/api/users",
          {
            withCredentials: true,
          },
        );

        if (isCurrent) setAllUser(response.data.users);
      } catch (error) {
        if (isCurrent) {
          console.error("USERS ERROR :", error);
          setAllUser([]);
        }
      }
    };

    loadAllUser();
    return () => {
      isCurrent = false;
    };
  }, [authVersion]);

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <Loader />
              ) : (
                <Welcome onAuthenticated={refreshAfterAuthentication} />
              )
            }
          />
          <Route
            path="/feeds"
            element={<Feed user={user} alluser={alluser} />}
          />
          <Route
            path="/fr"
            element={
              <FriendsPage allUser={alluser} setUserInfo={setUserInfo} />
            }
          />
          <Route path="pst" element={<Post user={user} />} />
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
          <Route path="/user/:userId" element={<UserProfile user={user} />} />
          <Route path="about" element={<AboutWavely />} />
          <Route path="/report" element={<ReportProblem />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route
            path="/admin"
            element={
              user?.role === "ADMIN" ? (
                <AdminDashboard user={user} />
              ) : (
                <Navigate to="/feeds" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
