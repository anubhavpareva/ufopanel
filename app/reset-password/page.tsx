"use client";

import CustomButton from "@/Components/Shared-ui/CustomButton";
import CustomText from "@/Components/Shared-ui/CustomText";
import { StyledTextField } from "@/Components/Shared-ui/StyledTextField";
import { colors } from "@/Constants/colors";
import AuthLayout from "@/layouts/AuthLayout";
import { useResetPasswordMutation } from "@/rtk/endpoints/authApi";
import { showAlert } from "@/rtk/feature/alertSlice";
import { Box, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation Schema
const schema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

type ResetForm = yup.InferType<typeof schema>;

export default function ResetPassword() {
  const params = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const token = params.get("token");

  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetForm) => {
    try {
      if (!token) {
        dispatch(
          showAlert({
            message: "Token missing. Please check your email link again.",
            severity: "error",
          })
        );
        router.replace('/');
        return;
      }

      const payload = {
        new_password: data.password,
        reset_token: token,
      };

      await resetPassword(payload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(showAlert({ message: "Password reset success", severity: "success" }));
      router.replace("/");
    }
  }, [isSuccess, dispatch, router]);

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
            backgroundColor: colors.voilet900,
            borderRadius: "32px",
            p: { xs: "32px", sm: "64px" },
            border: "1.5px solid",
            borderColor: colors.gray700,
            gap: { xs: "24px", sm: "42px" },
          }}
        >
          <CustomText text="Reset Password" fw400 h1 align="center" />

          <form >
            <Stack gap={"16px"}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    label="New Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    label="Confirm Password"
                    type="password"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />

              <CustomButton
                title="Reset Password"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              />
            </Stack>
          </form>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
