import Layout from "./style/Layout";
import Auth from "./components/authentication/Auth.component";
import { useAuth } from "./context/AuthContext";
import { useState, useEffect } from "react";

const App: React.FC = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const { currentUser } = useAuth();
  useEffect(() => {
    const cachedInfo = localStorage.getItem("hasAccount");
    if (!cachedInfo) return;
    const { hasAccount } = JSON.parse(cachedInfo) as { hasAccount: boolean };
    setHasAccount(hasAccount);
  }, []);
  return (
    <Layout>
      {!currentUser ? <Auth isRegister={!hasAccount} /> : <div></div>}
    </Layout>
  );
};

export default App;
