import { ReactNode } from "react";

import Box from "@mui/material/Box";

const OverlayImage = ({
  children,
  height,
}: {
  children: ReactNode;
  height: string;
}) => {
  return (
    <Box
      sx={{
        "::before": {
          height,
          content: "''",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 0.4,
          background: "linear-gradient(to bottom, black, transparent)",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default OverlayImage;
