import Layout from "./style/Layout";
import Auth from "./components/authentication/Auth.component";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
const App: React.FC = () => {
  const { currentUser, hasAccount } = useAuth();

  return (
    <Layout>
      {!currentUser ? <Auth isRegister={!hasAccount} /> : <Home />}
    </Layout>
  );
};

export default App;
