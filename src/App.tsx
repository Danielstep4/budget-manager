import Layout from "./style/Layout";
import Auth from "./components/authentication/Auth.component";

const App: React.FC = () => {
  return (
    <Layout>
      <Auth isRegister={false} />
    </Layout>
  );
};

export default App;
