"use client";

import { colors } from "@/Constants/colors";
import { Box, Stack } from "@mui/material";
import CustomText from "../Shared-ui/CustomText";
import { StyledTextField } from "../Shared-ui/StyledTextField";
import CustomButton from "../Shared-ui/CustomButton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { changePasswordSchema } from "@/Validations/ChangePasswordSchema";
import { useChangePasswordMutation } from "@/rtk/endpoints/authApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "@/rtk/feature/alertSlice";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/rtk/feature/authSlice";



type FormData = yup.InferType<typeof changePasswordSchema>;

export default function ChangePassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();
const [changePassword, {isLoading, isSuccess}] = useChangePasswordMutation();
  const onSubmit = async (data: FormData) => {
    try{
      const payload = {
        old_password:data.password,
        new_password:data.newPassword,
      }
      await changePassword(payload);
    }catch(err){
      console.log(err);
    }
  };
  useEffect(()=>{
    if(isSuccess){
      dispatch(showAlert({message:'Password changed successfully', severity:'success'}));
      reset();
      dispatch(logoutUser());
      router.replace('/');
    }
  },[isSuccess])
  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      gap="12px"
      height={324}
      maxHeight={324}
      sx={{
        backgroundColor: colors.gray1000,
        borderRadius: "20px",
        p: 4,
        color: "#fff",
        boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box display="flex" flexDirection="column" gap="24px">
        <CustomText text="Password" fw400 h5 />

        {/* Fields */}
        <Stack gap="16px">
          {/* Current Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                fullWidth
                type="password"
                label="Current Password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          {/* New & Confirm */}
          <Stack direction="row" spacing={2}>
            <Box flex={1}>
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    fullWidth
                    type="password"
                    label="New Password"
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                  />
                )}
              />
            </Box>

            <Box flex={1}>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Box>
          </Stack>
        </Stack>

        {/* Submit button */}
        <Stack width={{ xs: "100%", lg: "70%" }}>
          <CustomButton
            title="Update password"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
        </Stack>
      </Box>
    </Box>
  );
}
