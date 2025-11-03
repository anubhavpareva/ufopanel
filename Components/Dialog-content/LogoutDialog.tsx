import { Stack } from "@mui/material";
import CustomButton from "../Shared-ui/CustomButton";
import CustomText from "../Shared-ui/CustomText";
import LogoutIcon from "@mui/icons-material/Logout";
import { colors } from "@/Constants/colors";
import { useRouter } from "next/navigation";

interface LogoutDialogProps{
    handleClose:()=>void;
}

export default function LogoutDialog({handleClose}:LogoutDialogProps) {
    const router = useRouter();
    const handleLogout = () =>{
        router.replace('/');
    }
  return (
    <Stack sx={{ backgroundColor: colors.gray1000, gap: 3 }}>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        width={64}
        height={64}
        sx={{ backgroundColor: colors.primary100, borderRadius: "100px" }}
      >
        <LogoutIcon fontSize="small" sx={{ color: "#fff" }} />
      </Stack>
      <Stack gap={1}>
        <CustomText text="Logout?" h1 fw400 />
        <CustomText
          text="Are you sure you want to logout?"
          fw400
          h6
          color={colors.gray900}
        />
      </Stack>
      <Stack flexDirection={'row'} width={'100%'} gap={1}>
        <CustomButton title="cancel" onClick={handleClose} flex={1} type={1}/>
        <CustomButton title="Logout" onClick={handleLogout} flex={1}/>
      </Stack>
    </Stack>
  );
}
