import { Button } from "@mui/material";
import CustomText from "./CustomText";
import { colors } from "@/Constants/colors";
import Image from "next/image";

interface CustomButtonProp {
  title: string;
  onClick: () => void;
  flex?: 0 | 1;
  type?: number;
  imgSrc?: string | null;
}

export default function CustomButton({
  title,
  onClick,
  flex = 0,
  type = 0,
  imgSrc = null,
}: CustomButtonProp) {
  switch (type) {
    case 1:
      return (
        <Button
          onClick={onClick}
          sx={{
            px: "28px",
            py: "17px",
            borderRadius: "32px",
            flex: flex ? 1 : 0,
            border:1,
            borderColor:colors.gray600
          }}
        >
          <CustomText text={title} color={colors.gray500} p1 fw400 />
        </Button>
      );
    default:
      return (
        <Button
          onClick={onClick}
          sx={{
            backgroundColor: colors.white500,
            px: "28px",
            py: "17px",
            borderRadius: "32px",
            flex: flex ? 1 : 0,
            maxWidth:350
          }}
        >
         {imgSrc && <Image src={imgSrc} alt='btn Icon' width={24} height={24}/>}
          <CustomText text={title} color={colors.black50} p1 fw400 />
        </Button>
      );
  }
}
