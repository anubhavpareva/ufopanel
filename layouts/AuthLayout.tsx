"use client";

import { colors } from "@/Constants/colors";
import { images } from "@/Constants/images";
import { Box } from "@mui/material";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${images.authBgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          backgroundColor: colors.voilet500_80,
          height:'100%',
          
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
