import { colors } from "@/Constants/colors";
import { Typography } from "@mui/material";

interface CustomTextProp {
  /**font size */
  h1?: boolean;
  p1?: boolean;
  p2?: boolean;
  /**Font Weight */
  fw200?: boolean;
  fw300?: boolean;
  fw400?: boolean;
  fw500?: boolean;
  fw600?: boolean;
  fw700?: boolean;
  /**colors */
  color?: string;
  style?: any;
  align?: "left" | "center" | "right";
  text: string;
}

export default function CustomText({
  h1 = false,
  p1 = false,
  p2 = false,
  fw200 = false,
  fw300 = false,
  fw400 = false,
  fw500 = false,
  fw600 = false,
  fw700 = false,
  text,
  color = colors.white500,
  style = {},
  align = "left",
}: CustomTextProp) {
  const fontSize = (): string => {
    if (h1) return "32px";
    if (p1) return "14px";
    if (p2) return "12px";
    return "16px";
  };
  const fontWeight = () => {
    if (fw200) return "200";
    if (fw300) return "300";
    if (fw400) return "400";
    if (fw600) return "600";
    if (fw700) return "700";
    return "500";
  };
  return (
    <Typography
      color={color}
      textAlign={align}
      sx={[{ fontWeight: fontWeight(), fontSize: fontSize() }, style]}
    >
      {text}
    </Typography>
  );
}
