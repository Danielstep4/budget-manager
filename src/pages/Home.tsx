import { Box, useTheme } from "@material-ui/core";
import PieComp from "../components/content/Charts/Pie.component";
import MoneyFlow from "../components/content/MoneyFlow.component";
import HowItWorks from "../components/how-it-works/HowItWorks.component";
import Menu from "../components/menu/Menu.component";

const Home: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Menu />
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="space-between"
        pl={theme.sizes.menuWidth + 30 + "px"}
      >
        <MoneyFlow />
        <PieComp />
      </Box>
      <HowItWorks />
    </>
  );
};

export default Home;
