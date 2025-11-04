"use client";

import BackButton from "@/Components/Shared-ui/BackButton";
import CustomButton from "@/Components/Shared-ui/CustomButton";
import CustomLink from "@/Components/Shared-ui/CustomLink";
import CustomText from "@/Components/Shared-ui/CustomText";
import { StyledTextField } from "@/Components/Shared-ui/StyledTextField";
import { colors } from "@/Constants/colors";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotSchema } from "@/Validations/ForgotSchema";
import { useForgotPasswordMutation } from "@/rtk/endpoints/authApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { showAlert } from "@/rtk/feature/alertSlice";

export default function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [userEmail, setEmail] = useState("");
  const [forgotPassword, { data, isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const onSubmit = async (data: { email: string }) => {
    try {
      setEmail(data.email);
      await forgotPassword(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(showAlert({message:'OTP sent successfully', severity:'success'}))
      router.push(
        `/otp-verification?token=${
          data.verification_token
        }&type=${"forgot"}&email=${userEmail}`
      );
    }
  }, [isSuccess]);
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
          height={377}
          maxWidth={{ xs: "95%", sm: 480 }}
          maxHeight={377}
          justifyContent={"flex-end"}
          sx={{
            position: "relative",
            backgroundColor: colors.voilet900,
            borderRadius: "32px",
            p: { xs: "32px", sm: "64px" },
            border: "1.5px",
            borderColor: colors.gray700,
            gap: { xs: "24px", sm: "42px" },
          }}
        >
          <Box
            position={"absolute"}
            top={10}
            left={10}
            width={"48px"}
            height={"48px"}
          >
            <BackButton />
          </Box>
          <CustomText text="Forgot Password" fw400 h1 align="center" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={"16px"}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <CustomButton
                title="Check your inbox"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              />
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"4px"}
              >
                <CustomText
                  text="Have your password?"
                  fw400
                  p1
                  color={colors.gray500}
                />
                <CustomLink title="Signin" link="/" />
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
