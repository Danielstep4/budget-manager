import Layout from "./style/Layout";
import Auth from "./components/authentication/Auth.component";
import { useAuth } from "./context/AuthContext";
const App: React.FC = () => {
  const { currentUser, hasAccount } = useAuth();

  return (
    <Layout>
      {!currentUser ? <Auth isRegister={!hasAccount} /> : <div></div>}
    </Layout>
  );
};

export default App;
