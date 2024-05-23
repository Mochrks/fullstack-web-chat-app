import { useState, useEffect } from "react";
import Login from "./page/login";
import Content from "./page/main-content";

import "@/App.css";
function App() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = (username) => {
    setUsername(username);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="flex items-center justify-center h-screen">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </>
      ) : (
        <>
          {username ? (
            <Content username={username} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </>
      )}
    </>
  );
}

export default App;
