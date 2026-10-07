import UserProfile from "./pages/userProfile.jsx";
import UserContext from "./context/UserContext.jsx";
import { FriendshipProvider } from "./context/FriendshipContext.jsx";
import "./styles/App.css";
import Loader from "./components/loader.jsx";
import Welcome from "../src/pages/welcome.jsx";
<<<<<<< HEAD
import { useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
=======
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249
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
import SavedPosts from "./pages/savedPosts.jsx";

/*
 * Protect private Wavely routes.
 *
 * While authentication is being checked, we show the loader.
 * If there is no authenticated user, we redirect to the welcome page.
 * Only an authenticated user can access the protected page.
 */
function ProtectedRoute({ user, authLoading, children }) {
  if (authLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  // Initial Wavely loading screen
  const [loading, setLoading] = useState(true);

  // Authentication verification
  const [authLoading, setAuthLoading] = useState(true);

  const [isloading, setIsLoading] = useState(false);
<<<<<<< HEAD
=======
  const [showStory, setShowStory] = useState([]);

>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [alluser, setAllUser] = useState([]);
<<<<<<< HEAD
  const authRequestId = useRef(0);
=======

  // Used when authentication changes after login/logout
  const [authVersion, setAuthVersion] = useState(0);
>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249

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

  /*
   * Wavely's initial visual loader.
   *
   * This is separate from authLoading.
   * authLoading is responsible for checking the JWT.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  /*
   * Check whether the current user has a valid authentication cookie.
   *
   * IMPORTANT:
   * We do not allow protected pages to render until this request
   * has finished.
   */
  useEffect(() => {
<<<<<<< HEAD
    loadAuthenticatedUser().catch((error) => {
      if (error.response?.status !== 401) {
        console.error("Error verifying authentication:", error);
      }
    });
  }, [loadAuthenticatedUser]);
=======
    let isCurrent = true;

    const loadUser = async () => {
      setAuthLoading(true);

      try {
        const response = await axios.get(
          "https://wavely-backend-7ryc.onrender.com/api/me",
          {
            withCredentials: true,
          }
        );

        if (isCurrent) {
          setUser(response.data.user);
        }
      } catch (error) {
        if (isCurrent) {
          setUser(null);
        }
      } finally {
        if (isCurrent) {
          setAuthLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      isCurrent = false;
    };
  }, [authVersion]);
>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249

  /*
   * Load users ONLY after authentication has been confirmed.
   *
   * This prevents an unauthenticated visitor from requesting
   * protected user data.
   */
  useEffect(() => {
    let isCurrent = true;

    const loadAllUser = async () => {
<<<<<<< HEAD
=======
      // Do nothing while authentication is being checked
      if (authLoading) {
        return;
      }

      // Do not request users if nobody is authenticated
>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249
      if (!user) {
        setAllUser([]);
        return;
      }

      try {
        const response = await axios.get(
          "https://wavely-backend-7ryc.onrender.com/api/users",
          {
            withCredentials: true,
          }
        );

        if (isCurrent) {
          setAllUser(response.data.users);
        }
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
<<<<<<< HEAD
  }, [user]);
=======
  }, [user, authLoading, authVersion]);
>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249

  return (
    <UserContext.Provider value={user}>
      <FriendshipProvider
        key={user?.id || "anonymous"}
        user={user}
      >
        <BrowserRouter>
          <Routes>

            {/* =====================================================
                PUBLIC ROUTE
                ===================================================== */}

            <Route
              path="/"
              element={
                loading ? (
                  <Loader />
                ) : (
                  <Welcome
                    onAuthenticated={refreshAfterAuthentication}
                  />
                )
              }
            />

            {/* =====================================================
                PROTECTED ROUTES
                ===================================================== */}

            <Route
              path="/feeds"
              element={
<<<<<<< HEAD
                <ProtectedRoute authLoading={authLoading} user={user}>
                  <Feed user={user} alluser={alluser} />
=======
                <ProtectedRoute
                  user={user}
                  authLoading={authLoading}
                >
                  <Feed
                    user={user}
                    alluser={alluser}
                  />
>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249
                </ProtectedRoute>
              }
            />

            <Route
              path="/fr"
              element={
<<<<<<< HEAD
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
=======
                <ProtectedRoute
                  user={user}
                  authLoading={authLoading}
                >
                  <FriendsPage
                    allUser={alluser}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/pst"
              element={
                <ProtectedRoute
                  user={user}
                  authLoading={authLoading}
                >
                  <Post user={user} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/stories"
              element={
                <ProtectedRoute
                  user={user}
                  authLoading={authLoading}
                >
                  <ShowStories
                    alluser={alluser}
                    showStory={showStory}
                    setShowStory={setShowStory}
                  />
>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249
                </ProtectedRoute>
              }
            />

            <Route
              path="/saved"
<<<<<<< HEAD
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
=======
              element={
                <ProtectedRoute
                  user={user}
                  authLoading={authLoading}
                >
                  <SavedPosts
                    alluser={alluser}
>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settigns"
              element={
<<<<<<< HEAD
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
=======
                <ProtectedRoute
                  user={user}
                  authLoading={authLoading}
                >
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
              path="/account"
              element={
                <ProtectedRoute
                  user={user}
                  authLoading={authLoading}
                >
                  <ProfilAcc
                    user={user}
                    setUser={setUser}
                    allUsers={alluser}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/:userId"
              element={
                <ProtectedRoute
                  user={user}
                  authLoading={authLoading}
                >
                  <UserProfile user={user} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/report"
              element={
                <ProtectedRoute
                  user={user}
                  authLoading={authLoading}
                >
>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249
                  <ReportProblem />
                </ProtectedRoute>
              }
            />
<<<<<<< HEAD
            <Route
              path="/contact-support"
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
=======

            <Route
              path="/contact-support"
              element={
                <ProtectedRoute
                  user={user}
                  authLoading={authLoading}
                >
>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249
                  <ContactSupport />
                </ProtectedRoute>
              }
            />
<<<<<<< HEAD
            <Route
              path="/admin"
              element={
                <ProtectedRoute authLoading={authLoading} user={user}>
=======

            {/* =====================================================
                ADMIN ROUTE
                ===================================================== */}

            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  user={user}
                  authLoading={authLoading}
                >
>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249
                  {user?.role === "ADMIN" ? (
                    <AdminDashboard user={user} />
                  ) : (
                    <Navigate to="/feeds" replace />
                  )}
                </ProtectedRoute>
              }
            />

            {/* =====================================================
                PUBLIC INFORMATION PAGE
                ===================================================== */}

            <Route
              path="/about"
              element={<AboutWavely />}
            />

            {/* =====================================================
                FALLBACK
                ===================================================== */}

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>
        </BrowserRouter>
      </FriendshipProvider>
    </UserContext.Provider>
  );
}

<<<<<<< HEAD
function ProtectedRoute({ authLoading, user, children }) {
  if (authLoading) return <Loader />;
  return user ? children : <Navigate to="/" replace />;
}

export default App;
=======
export default App;
>>>>>>> 4e3914dd208ae47bd7a89e0f6b17a432a103c249
