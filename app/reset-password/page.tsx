"use client";

import CustomButton from "@/Components/Shared-ui/CustomButton";
import CustomLink from "@/Components/Shared-ui/CustomLink";
import CustomText from "@/Components/Shared-ui/CustomText";
import { StyledTextField } from "@/Components/Shared-ui/StyledTextField";
import { colors } from "@/Constants/colors";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";


export default function RestPassword() {
  return (
    <AuthLayout>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        height={"100%"}
      >
        <Stack
          width={{xs:'95%', sm:480}}
          height={377}
          maxWidth={{xs:'95%', sm:480}}
          maxHeight={377}
          justifyContent={'flex-end'}
          sx={{
            backgroundColor: colors.voilet900,
            borderRadius: "32px",
            p: {xs:'32px', sm:'64px'},
            border: "1.5px",
            borderColor: colors.gray700,
            gap:{xs:'24px', sm:'42px'}
          }}
        >
          <CustomText text="Reset Password" fw400 h1 align="center" />
          <Stack gap={'16px'}>
            <Stack gap={'16px'}>
              <StyledTextField label="New Password" type="text" />
              <StyledTextField label="Confirm Password" type="text" />
            </Stack>
            <CustomButton
              title="Reset Password"
              onClick={() => console.log("pressed")}
            />
          </Stack>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
