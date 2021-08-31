import { Box } from "@material-ui/core";
import PieComp from "../components/content/Charts/Pie.component";
import MoneyFlow from "../components/content/MoneyFlow.component";
import HowItWorks from "../components/how-it-works/HowItWorks.component";
import Menu from "../components/menu/Menu.component";

const Home: React.FC = () => {
  return (
    <Box height="100%" width="100%">
      <Menu />
      <MoneyFlow />
      <PieComp />
      <HowItWorks />
    </Box>
  );
};

export default Home;
