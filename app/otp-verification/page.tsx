"use client";
import OTPInput from "@/Components/OtpInput";
import CustomButton from "@/Components/Shared-ui/CustomButton";
import CustomText from "@/Components/Shared-ui/CustomText";
import { colors } from "@/Constants/colors";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function OtpVerification() {
  const [timer, setTimer] = useState(60);
  const inputLength = 4;
  const [otp, setOtp] = useState<string[]>(new Array(inputLength).fill(""));
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const handleResend = async () => {
    // if (!email) {

    //   return;
    // }
    try {
      setIsResendDisabled(true);
      setTimer(60);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  useEffect(() => {
    let interval: any;

    if (timer > 0) {
      setIsResendDisabled(true);
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

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
          width={{ xs: "95%", sm: 480 }}
          height={{ sx: 650, sm: 377 }}
          maxWidth={480}
          maxHeight={{ sx: 650, sm: 377 }}
          justifyContent={"flex-end"}
          sx={{
            backgroundColor: colors.voilet900,
            borderRadius: "32px",
            px: "64px",
            py: "32px",
            border: "1.5px",
            borderColor: colors.gray700,
            gap: "24px",
          }}
        >
          <CustomText text="Verify Your OTP!" fw400 h1 align="center" />
          <Stack gap={"14px"}>
            <CustomText
              text={`A 4 digit code has been sent to`}
              align="center"
              fw300
              p1
            />
            <OTPInput otp={otp} setOtp={setOtp} inputLength={inputLength} />
            <CustomText text="Didn't Receive OTP?" align="center" fw300 p1 />
            <Button
              sx={{
                display: "flex",
                gap: 1,
                cursor: isResendDisabled ? "not-allowed" : "pointer",
              }}
              onClick={!isResendDisabled ? handleResend : undefined}
            >
              Resend OTP
              {isResendDisabled  && 
              <Box
                sx={{
                  backgroundColor: colors.white500,
                  borderRadius: "20px",
                  px: 2,
                  py: 0.25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "60px",
                }}
              >
                <Typography fontSize={14} fontWeight={500}>
                  {String(Math.floor(timer / 60)).padStart(2, "0")}:
                  {String(timer % 60).padStart(2, "0")}
                </Typography>
              </Box>}
            </Button>
            <CustomButton
              title="Submit"
              onClick={() => console.log("pressed")}
            />
          </Stack>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
