"use client";
import OTPInput from "@/Components/OtpInput";
import BackButton from "@/Components/Shared-ui/BackButton";
import CustomButton from "@/Components/Shared-ui/CustomButton";
import CustomText from "@/Components/Shared-ui/CustomText";
import { colors } from "@/Constants/colors";
import AuthLayout from "@/layouts/AuthLayout";
import { useResendMutation, useVerifyOtpMutation } from "@/rtk/endpoints/authApi";
import { showAlert } from "@/rtk/feature/alertSlice";
import { loginUser } from "@/rtk/feature/authSlice";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function OtpVerification() {
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const type = params.get("type");
  const router = useRouter();
  const dispatch = useDispatch();
  if (!token || !email) {
    router.back();
  }

  const [timer, setTimer] = useState(60);
  const inputLength = 4;
  const [otp, setOtp] = useState<string[]>(new Array(inputLength).fill(""));
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [verifyOtp, { data, isLoading, isSuccess }] = useVerifyOtpMutation();
const [resend, {isLoading:resendLoading, isSuccess:resendSuccess}] = useResendMutation();
  const handleResend = async () => {
    try {
      const payload = {
        verification_token:token || ""
      };
      await resend(payload);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };
useEffect(()=>{
if(resendSuccess){
  setIsResendDisabled(true);
  setTimer(60);
  dispatch(showAlert({message:'OTP sent again', severity:'success'}))
}
},[resendSuccess])
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

  const handleVerifyOtp = async () => {
    const finalOtp = otp.join("");

    // ✅ Basic validation
    if (finalOtp.length < inputLength) {
      setOtpError("Please enter the complete 4-digit OTP.");
      return;
    }

    setOtpError(null);

    try {
      const payload = {
        verification_token: token || "",
        otp: finalOtp,
        purpose: type === "forgot" ? "reset_password" : "signup_verification",
      };
      await verifyOtp(payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("OTP verified successfully", data);
      // navigate to dashboard or reset password page
      if (type === "forgot") {
        router.push(`/reset-password?token=${data.reset_token}`);
      } else {
        dispatch(loginUser(data))
        router.replace("/dashboard");
      }
    }
  }, [isSuccess]);

  return (
    <AuthLayout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
      >
        <Stack
          width={{ xs: "95%", sm: 480 }}
          maxWidth={480}
          justifyContent="flex-end"
          sx={{
            position: "relative",
            backgroundColor: colors.voilet900,
            borderRadius: "32px",
            px: "64px",
            py: "32px",
            border: "1.5px",
            borderColor: colors.gray700,
            gap: "24px",
          }}
        >
          <Box
            position="absolute"
            top={10}
            left={10}
            width="48px"
            height="48px"
          >
            <BackButton />
          </Box>

          <CustomText text="Verify Your OTP!" fw400 h1 align="center" />
          <Stack gap="14px">
            <CustomText
              text={`A 4 digit code has been sent to`}
              align="center"
              fw300
              p1
            />
            <CustomText text={email || ""} align="center" fw300 p2 />

            {/* OTP Input */}
            <OTPInput otp={otp} setOtp={setOtp} inputLength={inputLength} />

            {/* Validation Message */}
            {otpError && (
              <Typography
                color="error"
                textAlign="center"
                fontSize="0.85rem"
                mt={1}
              >
                {otpError}
              </Typography>
            )}

            {/* Resend Button */}
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
              {isResendDisabled && (
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
                </Box>
              )}
            </Button>

            {/* Submit Button */}
            <CustomButton
              title="Submit"
              onClick={handleVerifyOtp}
              disabled={isLoading}
            />
          </Stack>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
