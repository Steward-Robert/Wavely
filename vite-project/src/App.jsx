import "./styles/App.css";
import Loader from "./components/loader.jsx";
import Welcome from "./components/welcome.jsx";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return <div>{loading ? <Loader /> : <Welcome />}</div>;
}

export default App;
