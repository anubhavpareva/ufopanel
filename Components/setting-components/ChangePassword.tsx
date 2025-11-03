"use client";

import { colors } from "@/Constants/colors";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import CustomText from "../Shared-ui/CustomText";
import { StyledTextField } from "../Shared-ui/StyledTextField";
import CustomButton from "../Shared-ui/CustomButton";

export default function ChangePassword() {
  return (
    <Box
    flex={1}
      display={"flex"}
      flexDirection={"column"}
      gap={"12px"}
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
      {/* Content */}
      <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
        <CustomText text="Password" fw400 h5 />

        {/* Password field */}
        <Stack gap={'16px'}>
          <StyledTextField fullWidth type="password" label="Password" />

          {/* New password & confirm password */}
          <Stack direction={"row"} spacing={2}>
            <Box flex={1}>
              <StyledTextField fullWidth type="password" label="New Password" />
            </Box>

            <Box flex={1}>
              <StyledTextField
                fullWidth
                type="password"
                label="Confirm Password"
              />
            </Box>
          </Stack>
        </Stack>

        {/* Update button */}
        <Stack width={{ xs: "100%", lg: "70%" }}>
          <CustomButton
            title="Update password"
            onClick={() => console.log("pressed")}
          />
        </Stack>
      </Box>
    </Box>
  );
}
