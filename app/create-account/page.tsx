"use client";

import BackButton from "@/Components/Shared-ui/BackButton";
import CustomButton from "@/Components/Shared-ui/CustomButton";
import CustomCheckbox from "@/Components/Shared-ui/CustomCheckbox";
import CustomLink from "@/Components/Shared-ui/CustomLink";
import CustomText from "@/Components/Shared-ui/CustomText";
import { StyledTextField } from "@/Components/Shared-ui/StyledTextField";
import { colors } from "@/Constants/colors";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/Validations/SignupSchema";
import * as yup from "yup";
import { useSignupMutation } from "@/rtk/endpoints/authApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showAlert } from "@/rtk/feature/alertSlice";

type FormData = yup.InferType<typeof signupSchema>;

export default function CreateAccount() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const [signup, {data, isLoading, isSuccess}] = useSignupMutation();
  const [userEmail, setEmail] = useState('');
  // ✅ Handle form submission
  const onSubmit = async (data: FormData) => {
    try{
      setEmail(data.email);
      const payload = {
        full_name:data.fullName,
        email:data.email,
        password:data.password,
        agree_to_terms:data.terms

      }
      await signup(payload);
    }catch(err){
      console.log(err);
    }
    console.log("Form Data:", data);
    // Call your API or mutation here
  };

  useEffect(()=>{
    if(isSuccess){
      dispatch(showAlert({message:'Otp sent to your mail', severity:'success'}))
      router.push(`/otp-verification?token=${data.verification_token}&email=${userEmail}`);
    }
  },[isSuccess])

  return (
    <AuthLayout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
      >
        <form style={{ width: "100%" }}>
          <Stack
            width={{ xs: "95%", sm: 480 }}
            maxWidth={{ xs: "95%", sm: 480 }}
            justifyContent="flex-end"
            sx={{
              position: "relative",
              backgroundColor: colors.voilet900,
              borderRadius: "32px",
              p: { xs: "32px", sm: "64px" },
              border: "1.5px solid",
              borderColor: colors.gray700,
              gap: { xs: "24px", sm: "42px" },
              mx: "auto",
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

            <CustomText text="Create an account" fw400 h1 align="center" />

            <Stack gap="16px">
              {/* Full Name */}
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    label="Full Name"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />

              {/* Email */}
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

              {/* Password */}
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

              {/* Confirm Password */}
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

              {/* Checkbox */}
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    text="I agree to the Terms of service and privacy policy"
                    isCheck={field.value}
                    setCheck={(val) => field.onChange(val)}
                  />
                )}
              />
              {errors.terms && (
                <CustomText
                  text={errors.terms.message || ""}
                  p1
                  color="red"
                  align="left"
                />
              )}
            </Stack>

            {/* Submit Button */}
            <CustomButton
              title="Create an account"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            />

            {/* Footer */}
            <Stack direction="row" justifyContent="center" gap="4px">
              <CustomText
                text="Already have an account?"
                fw400
                p1
                color={colors.gray500}
              />
              <CustomLink title="Sign in" link="/" />
            </Stack>
          </Stack>
        </form>
      </Box>
    </AuthLayout>
  );
}
