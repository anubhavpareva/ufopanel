"use client";

import BackButton from "@/Components/Shared-ui/BackButton";
import CustomButton from "@/Components/Shared-ui/CustomButton";
import CustomLink from "@/Components/Shared-ui/CustomLink";
import CustomText from "@/Components/Shared-ui/CustomText";
import { StyledTextField } from "@/Components/Shared-ui/StyledTextField";
import { colors } from "@/Constants/colors";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";


export default function Home() {
  const navigate = useRouter();
  const handleLogin = () =>{
    navigate.push('/dashboard');
  }
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
          height={{xs:450, sm:440}}
          maxWidth={480}
          maxHeight={{xs:450, sm:440}}
          justifyContent={'flex-end'}
          sx={{
            position:'relative',
            backgroundColor: colors.voilet900,
            borderRadius: "32px",
            p: {xs:'32px', sm:'64px'},
            border: "1.5px",
            borderColor: colors.gray700,
            gap:{xs: '24px',sm:'42px'}
          }}
        >
          <Box position={'absolute'} top={10} left={10} width={'48px'} height={'48px'}>
            <BackButton />
          </Box>
          <CustomText text="Welcom Back!" fw400 h1 align="center" />
          <Stack gap={'16px'}>
            <Stack gap={'16px'}>
              <StyledTextField label="Email" type="email" />
              <Stack gap={1}>
                <StyledTextField label='Password' type="text"/>
                <CustomLink title="Forgot Password" link="/forgot-password" type={2} align="right"/>
              </Stack>
            </Stack>
            <CustomButton
              title="Login"
              onClick={handleLogin}
            />
            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={'4px'}>
              <CustomText text="Don't have an account?" fw400 p1 color={colors.gray500}/>
              <CustomLink title="Sign up" link='/create-account'/>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
