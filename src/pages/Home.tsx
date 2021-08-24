import { Box } from "@material-ui/core";
import MoneyFlow from "../components/content/MoneyFlow.component";
import Menu from "../components/menu/Menu.component";

const Home: React.FC = () => {
  return (
    <Box display="flex" justifyContent="flex-start" height="100%" width="100%">
      <Menu />
      <MoneyFlow />
    </Box>
  );
};

export default Home;
