import Layout from "./style/Layout";
import Auth from "./components/authentication/Auth.component";
import { useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <Layout>{!currentUser ? <Auth isRegister={false} /> : <div></div>}</Layout>
  );
};

export default App;
