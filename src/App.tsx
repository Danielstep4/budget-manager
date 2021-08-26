import Layout from "./style/Layout";
import Auth from "./components/authentication/Auth.component";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
const App: React.FC = () => {
  const { userId, hasAccount } = useAuth();

  return (
    <Layout>{!userId ? <Auth isRegister={!hasAccount} /> : <Home />}</Layout>
  );
};

export default App;
