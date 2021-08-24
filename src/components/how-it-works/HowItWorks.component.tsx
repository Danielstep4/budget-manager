import { useState, useEffect } from "react";
import { IconButton, Box, useTheme, Typography } from "@material-ui/core";
import { HelpSharp, Close } from "@material-ui/icons";
import { useBackdrop } from "../../context/BackdropContext";
const HowItWorks: React.FC = () => {
  const theme = useTheme();
  const { setBackdropOpen, backdropOpen } = useBackdrop();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setBackdropOpen(isOpen);
  }, [isOpen, setBackdropOpen]);
  useEffect(() => {
    if (!backdropOpen) setIsOpen(false);
  }, [backdropOpen]);
  return (
    <>
      <Box
        position="fixed"
        bgcolor={theme.palette.background.paper}
        borderRadius={theme.shape.borderRadius}
        p={5}
        display={isOpen ? "block" : "none"}
        height="90%"
        width="90%"
        left="0"
        right="0"
        top="0"
        bottom="0"
        margin="auto"
        zIndex="2"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Typography color="primary" variant="h4">
            How It Works?
          </Typography>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <Close />
          </IconButton>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            dapibus ipsum facilisis faucibus maximus. Aliquam pellentesque nibh
            pellentesque urna lacinia, at consectetur elit eleifend. Cras
            vulputate quam metus, nec consequat arcu ullamcorper rhoncus.
            Suspendisse potenti. Morbi a lectus quis neque scelerisque tempus
            eget sit amet justo. Duis non semper ex, et mattis metus. In hac
            habitasse platea dictumst. Fusce ipsum ipsum, feugiat id lorem in,
            aliquam ultricies purus. Sed aliquet lacus ut ex interdum, et
            hendrerit enim sollicitudin. Donec non ligula auctor, semper turpis
            sed, tempor tellus. Ut leo ante, faucibus at massa sed, interdum
            commodo arcu. Pellentesque dolor nulla, vulputate vel enim
            elementum, finibus euismod nisl. Nam fermentum mi vitae lorem
            feugiat venenatis. Duis ornare odio sed metus pulvinar tempus.
            Vivamus in vestibulum lorem, id mattis ex. Pellentesque eros metus,
            iaculis vel velit eget, pellentesque accumsan metus. Nam lorem dui,
            porta in placerat vitae, porta id sapien. Duis interdum, diam non
            iaculis ullamcorper, risus erat faucibus dui, ac cursus diam nulla
            at velit. Sed auctor libero vel iaculis iaculis. Morbi mattis enim
            ut ultricies ultricies. Sed non nibh at ante ullamcorper malesuada.
            Nunc et ipsum eu leo scelerisque rutrum. Donec tellus ante, posuere
            id lorem quis, malesuada ornare tortor. Sed a nisi bibendum,
            ullamcorper metus auctor, faucibus orci. Fusce ut ante sollicitudin
            tortor interdum consectetur at in mi. Phasellus placerat a leo sit
            amet imperdiet. Donec pellentesque a lacus sit amet molestie.
            Integer ultricies ullamcorper odio, in vehicula nulla. Suspendisse
            lacinia magna in fermentum viverra. Morbi aliquet dapibus dui ut
            aliquet. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; Integer nec placerat quam. Fusce
            fringilla feugiat metus, eget gravida enim consectetur eu. Nam
            efficitur turpis turpis, eu bibendum enim rutrum a. Cras ornare
            mollis sem vitae maximus. Maecenas finibus semper tellus et aliquet.
            Duis ex est, facilisis nec ante eu, ultrices commodo eros. Ut
            porttitor turpis nec fringilla auctor. Donec porttitor, dui ac
            dignissim auctor, turpis erat viverra orci, non tristique elit nulla
            vel elit. Nulla sed velit et nisl molestie consequat eu a mauris. In
            quis est viverra, rutrum erat nec, sollicitudin sapien. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Nulla vestibulum egestas sodales. Sed neque massa,
            imperdiet nec semper ac, iaculis sed erat. Nullam consequat
            tristique nisi, eget elementum lorem egestas quis. Etiam interdum,
            libero feugiat sollicitudin pellentesque, dolor ligula facilisis
            arcu, a placerat tellus leo eu nisi. Maecenas ultrices ex et nisi
            tempor tempus eget sit amet urna. Vivamus hendrerit mi et risus
            sodales, ut bibendum orci pretium.
          </Typography>
        </Box>
      </Box>
      <IconButton
        color="primary"
        style={{ position: "fixed", right: "5px", bottom: "5px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <HelpSharp style={{ fontSize: "55px" }} />
      </IconButton>
    </>
  );
};

export default HowItWorks;
