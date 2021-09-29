import { Box, CircularProgress } from "@material-ui/core";

const LoadingIndicator: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicator;
