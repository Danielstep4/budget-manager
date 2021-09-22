import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import PieComp from "../components/content/Charts/Pie.component";
import MoneyFlow from "../components/content/MoneyFlow.component";
import HowItWorks from "../components/how-it-works/HowItWorks.component";
import Menu from "../components/menu/Menu.component";

const Home: React.FC = () => {
  const theme = useTheme();
  const matchesXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMedium = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Menu />
      <Box
        height="100%"
        width="100%"
        display="flex"
        flexDirection={matchesMedium ? "column" : "row"}
        justifyContent="space-between"
        pr={matchesMedium ? "30px" : 0}
        pl={matchesXSmall ? "30px" : theme.sizes.menuWidth + 30 + "px"}
      >
        <MoneyFlow />
        <PieComp />
      </Box>
      <HowItWorks />
    </>
  );
};

export default Home;
