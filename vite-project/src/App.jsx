import UserProfile from "./pages/userProfile.jsx";
import UserContext from "./context/UserContext.jsx";
import { FriendshipProvider } from "./context/FriendshipContext.jsx";
import "./styles/App.css";
import Loader from "./components/loader.jsx";
import Welcome from "../src/pages/welcome.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
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
import SavedPosts from "./pages/savedPosts.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [alluser, setAllUser] = useState([]);
  const authRequestId = useRef(0);

  const loadAuthenticatedUser = useCallback(async () => {
    const requestId = ++authRequestId.current;

    try {
      const response = await axios.get(
        "https://wavely-backend-7ryc.onrender.com/api/me",
        {
          withCredentials: true,
        },
      );
      const authenticatedUser = response.data.user;

      if (!authenticatedUser) {
        throw new Error("The authenticated user could not be loaded.");
      }
      if (requestId === authRequestId.current) setUser(authenticatedUser);
      return authenticatedUser;
    } catch (error) {
      if (requestId === authRequestId.current) setUser(null);
      throw error;
    } finally {
      if (requestId === authRequestId.current) setAuthLoading(false);
    }
  }, []);
  const refreshAfterAuthentication = useCallback(() => {
    setAuthLoading(true);
    return loadAuthenticatedUser();
  }, [loadAuthenticatedUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    loadAuthenticatedUser().catch((error) => {
      if (error.response?.status !== 401) {
        console.error("Error verifying authentication:", error);
      }
    });
  }, [loadAuthenticatedUser]);

  useEffect(() => {
    let isCurrent = true;

    const loadAllUser = async () => {
      if (!user) {
        setAllUser([]);
        return;
      }

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
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <FriendshipProvider key={user?.id || "anonymous"} user={user}>
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
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
                  <Feed user={user} alluser={alluser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fr"
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
                  <FriendsPage allUser={alluser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="pst"
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
                  <Post user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stories"
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
                  <ShowStories alluser={alluser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved"
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
                  <SavedPosts alluser={alluser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="settigns"
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
                  <Settings
                    isloading={isloading}
                    setIsLoading={setIsLoading}
                    user={user}
                    setUser={setUser}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="account"
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
                  <ProfilAcc user={user} setUser={setUser} allUsers={alluser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:userId"
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
                  <UserProfile user={user} />
                </ProtectedRoute>
              }
            />
            <Route path="about" element={<AboutWavely />} />
            <Route
              path="/report"
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
                  <ReportProblem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact-support"
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
                  <ContactSupport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
                  {user?.role === "ADMIN" ? (
                    <AdminDashboard user={user} />
                  ) : (
                    <Navigate to="/feeds" replace />
                  )}
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </FriendshipProvider>
    </UserContext.Provider>
  );
}

function ProtectedRoute({ authLoading, user, children }) {
  if (authLoading) return <Loader />;
  return user ? children : <Navigate to="/" replace />;
}

export default App;
