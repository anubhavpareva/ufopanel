"use client";

import { Box, Avatar, Divider, InputAdornment, Stack } from "@mui/material";
import { StyledTextField } from "../Shared-ui/StyledTextField";
import { colors } from "@/Constants/colors";
import CustomText from "../Shared-ui/CustomText";
import { icons } from "@/Constants/icons";
import Image from "next/image";
import CustomButton from "../Shared-ui/CustomButton";

export default function EditProfile() {
  return (
    <Box
      flex={1}
      display={"flex"}
      flexDirection={"column"}
      gap={"12px"}
      sx={{
        backgroundColor: colors.gray1000,
        borderRadius: "20px",
        p: 4,
        color: "#fff",
        boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header Section */}
      <CustomText text="Profile Information" fw400 h5 />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "column", lg: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: colors.gray400,
              color: "#fff",
              fontSize: 20,
            }}
          >
            RS
          </Avatar>
          <Box>
            <CustomText
              text={`Joined: 2025-01-15`}
              fw400
              p2
              color={colors.gray500}
            />
            <CustomText
              text={`Subscription Plan: Pro`}
              fw400
              p2
              color={colors.gray500}
            />
            <CustomText
              text={`Last Login: 2025-10-08 18:39:12`}
              fw400
              p2
              color={colors.gray500}
            />
          </Box>
        </Box>

        <CustomButton
          imgSrc={icons.edit}
          title="Update Profile Photo"
          onClick={() => console.log("pressed")}
          flex={1}
        />
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

      {/* Form Fields */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box display={"flex"} gap={"16px"} flexDirection={"column"}>
          <CustomText text="Display name" fw400 p1 color={colors.white500} />
          <StyledTextField
            fullWidth
            value="Chelsie Haley"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                backgroundColor: "#0A0A1A",
                color: "#fff",
                "& fieldset": { borderColor: "#333" },
                "&:hover fieldset": { borderColor: "#555" },
                "&.Mui-focused fieldset": { borderColor: "#7A5CFA" },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Image src={icons.tick} alt="tick" width={24} height={24} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box display={"flex"} gap={"16px"} flexDirection={"column"}>
          <CustomText text="Email" fw400 p1 color={colors.white500} />

          <StyledTextField
            fullWidth
            value="chelsiehaley@email.com"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                backgroundColor: "#0A0A1A",
                color: "#fff",
                "& fieldset": { borderColor: "#333" },
                "&:hover fieldset": { borderColor: "#555" },
                "&.Mui-focused fieldset": { borderColor: "#7A5CFA" },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Image src={icons.tick} alt="tick" width={24} height={24} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Stack width={{ xs: "100%", md: "50%" }}>
          <CustomButton
            title="Update Profile"
            onClick={() => console.log("pressed")}
          />
        </Stack>
      </Box>
    </Box>
  );
}
