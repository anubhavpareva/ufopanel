"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { colors } from "@/Constants/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import { icons } from "@/Constants/icons";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Go to previous page
  };

  return (
    <Button
      onClick={handleBack}
      sx={{
        borderRadius: '100px',
        textTransform: "none",
        fontWeight: 500,
        width:'48px',
        minWidth:'48px',
        height:'48px',
        border: 1,
        borderColor: colors.gray600,
        backgroundColor:colors.black100,
      }}
    >
      <Image src={icons.close} alt="close" width={24} height={24}/>
    </Button>
  );
}
