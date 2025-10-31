import { Button } from "@mui/material";
import CustomText from "./CustomText";
import { colors } from "@/Constants/colors";

interface CustomButtonProp {
  title: string;
  onClick: () => void;
}

export default function CustomButton({ title, onClick }: CustomButtonProp) {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: colors.white500,
        px: "28px",
        py: "17px",
        borderRadius: "32px",
      }}
    >
      <CustomText text={title} color={colors.black50} p1 fw400/>
    </Button>
  );
}
