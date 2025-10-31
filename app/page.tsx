"use client";

import CustomButton from "@/Components/Shared-ui/CustomButton";
import CustomLink from "@/Components/Shared-ui/CustomLink";
import CustomText from "@/Components/Shared-ui/CustomText";
import { colors } from "@/Constants/colors";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Stack } from "@mui/material";

export default function Home() {
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
          width={480}
          height={440}
          maxWidth={480}
          maxHeight={440}
          sx={{
            backgroundColor: colors.voilet900,
            borderRadius: "32px",
            p: 4,
            border: "1.5px",
            borderColor: colors.gray700,
          }}
        >
          <CustomText text="Welcom Back!" fw400 h1 align="center" />
          <Stack gap={'16px'}>
            <CustomButton
              title="Create an account"
              onClick={() => console.log("pressed")}
            />
            <Stack>
              <Stack>
                <CustomLink title="Forgot Password" link="/" type={2}/>
              </Stack>
            </Stack>
            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={'4px'}>
              <CustomText text='Already have an account?' fw400 p1 color={colors.gray500}/>
              <CustomLink title="Sign up" link='/'/>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
