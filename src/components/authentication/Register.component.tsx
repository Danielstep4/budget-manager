import { Box, Container, Typography } from "@material-ui/core";
const Register: React.FC = () => {
  return (
    <Box
      height="100%"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="690px" height="525px" border="1px solid white">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="baseline"
        >
          <Typography variant="h4">Welcome to</Typography>
          <Box mx={0.5}></Box>
          <Typography color="primary" variant="h4">
            Budget Manager
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
