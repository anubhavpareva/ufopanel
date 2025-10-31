"use client";
import CustomButton from "@/Components/Shared-ui/CustomButton";
import CustomCheckbox from "@/Components/Shared-ui/CustomCheckbox";
import CustomLink from "@/Components/Shared-ui/CustomLink";
import CustomText from "@/Components/Shared-ui/CustomText";
import { StyledTextField } from "@/Components/Shared-ui/StyledTextField";
import { colors } from "@/Constants/colors";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Stack } from "@mui/material";
import { useState } from "react";

export default function CreateAccount() {
  const [isCheck, setCheck] = useState(false);
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
          height={{xs:650, sm:600}}
          maxWidth={{xs:'95%', sm:480}}
          maxHeight={{xs:650, sm:600}}
          justifyContent={"flex-end"}
          sx={{
            backgroundColor: colors.voilet900,
            borderRadius: "32px",
            p: {xs:'32px', sm:'64px'},
            border: "1.5px",
            borderColor: colors.gray700,
            gap: {xs:'24px', sm:"42px"},
          }}
        >
          <CustomText text="Create an account" fw400 h1 align="center" />
          <Stack gap={"24px"}>
            <Stack gap={"16px"}>
              <StyledTextField label="Full name" type="text"/>
              <StyledTextField label="Email" type="email"/>
              <StyledTextField label="Password" type="text"/>
              <StyledTextField label="Confirm Password" type="text"/>
              <CustomCheckbox
                text="I agree to the Terms of service and privacy policy"
                isCheck={isCheck}
                setCheck={setCheck}
              />
            </Stack>
            <CustomButton
              title="Create an account"
              onClick={() => console.log("pressed")}
            />
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"4px"}
            >
              <CustomText
                text="Already have an account?"
                fw400
                p1
                color={colors.gray500}
              />
              <CustomLink title="Sign in" link="/" />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
