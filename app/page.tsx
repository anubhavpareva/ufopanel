"use client";

import BackButton from "@/Components/Shared-ui/BackButton";
import CustomButton from "@/Components/Shared-ui/CustomButton";
import CustomLink from "@/Components/Shared-ui/CustomLink";
import CustomText from "@/Components/Shared-ui/CustomText";
import { StyledTextField } from "@/Components/Shared-ui/StyledTextField";
import { colors } from "@/Constants/colors";
import AuthLayout from "@/layouts/AuthLayout";
import { useLoginMutation } from "@/rtk/endpoints/authApi";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/Validations/LoginSchema";
import { useDispatch } from "react-redux";
import { showAlert } from "@/rtk/feature/alertSlice";
import { loginUser } from "@/rtk/feature/authSlice";
import PublicRoute from "@/Components/Shared-ui/PublicWrapper";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Home() {
  const navigate = useRouter();
  const [useLogin, { data, isLoading, isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();
  // ✅ Setup React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ Handle Submit
  const handleLogin = async (formData: LoginFormInputs) => {
    try {
      await useLogin(formData);
    } catch (err) {
      console.log("Login Error:", err);
    }
  };

  // ✅ Redirect if login successful
  useEffect(() => {
    if (isSuccess) {
      dispatch(loginUser(data));
      dispatch(showAlert({ message: "Log-in success", severity: "success" }));
      navigate.push("/dashboard");
    }
  }, [isSuccess, navigate]);

  return (
    <PublicRoute>
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
              p: { xs: "32px", sm: "64px" },
              border: "1.5px",
              borderColor: colors.gray700,
              gap: { xs: "24px", sm: "42px" },
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

            <CustomText text="Welcome Back!" fw400 h1 align="center" />

            {/* ✅ Form Start */}
            <form onSubmit={handleSubmit(handleLogin)}>
              <Stack gap="16px">
                {/* Email Field */}
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

                {/* Password Field */}
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Password"
                      type="password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />

                {/* Forgot Password Link */}
                <CustomLink
                  title="Forgot Password"
                  link="/forgot-password"
                  type={2}
                  align="right"
                />

                {/* Login Button */}
                <CustomButton
                  title={isLoading ? "Logging in..." : "Login"}
                  onClick={handleSubmit(handleLogin)}
                  disabled={isLoading}
                />

                {/* Signup Link */}
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  gap="4px"
                >
                  <CustomText
                    text="Don't have an account?"
                    fw400
                    p1
                    color={colors.gray500}
                  />
                  <CustomLink title="Sign up" link="/create-account" />
                </Stack>
              </Stack>
            </form>
            {/* ✅ Form End */}
          </Stack>
        </Box>
      </AuthLayout>
    </PublicRoute>
  );
}
