import Box from "@mui/material/Box";

const GradientBackdrop = ({ height }: { height: string }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height,
        background: "linear-gradient(to bottom, black, transparent)",
        opacity: "0.5",
        top: 0,
        zIndex: 10,
      }}
    />
  );
};

export default GradientBackdrop;
