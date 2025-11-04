"use client";

import {
  Box,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomText from "./CustomText";
import { useState } from "react";
import CustomDialog from "./CustomDialog";
import LogoutDialog from "../Dialog-content/LogoutDialog";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import authSlice from "@/rtk/feature/authSlice";
import { colors } from "@/Constants/colors";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setDialog] = useState(false);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const user = useSelector((state:any)=>state.auth.user);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSetting = () =>{
    router.push('/dashboard/settings');
  }
  const handleDialog = () => {
    setDialog(true);
    setAnchorEl(null);
  };
  const closeDialog = () => {
    setDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        px: 2,
        color: "#fff",
      }}
    >
      {/* Left: Title */}
      <CustomText text={title} fw400 h1 />

      {/* Right: Search + Icons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Search bar */}
        <TextField
          placeholder="Search anything..."
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "#0A0A1A",
            borderRadius: "30px",
            width: "240px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              "& input": { color: "#fff" },
            },
            "& .MuiInputAdornment-root": { color: "#aaa" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        {/* Notification Icon */}
        <IconButton
          sx={{
            backgroundColor: "#0A0A1A",
            color: colors.white,
            borderRadius: "50%",
            width: 40,
            height: 40,
            "&:hover": { backgroundColor: "#1B1B2F" },
          }}
        >
          <NotificationsNoneIcon />
        </IconButton>

        {/* Avatar with dropdown */}
        <Avatar
          onClick={handleAvatarClick}
          sx={{
            backgroundColor: "#0A0A1A",
            color: "#fff",
            width: 40,
            height: 40,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          {user?.name?.toUpperCase()?.slice(0, 2)}
        </Avatar>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: "#0A0A1A",
              color: "#fff",
              borderRadius: "12px",
              mt: 1,
              minWidth: 160,
              "& .MuiMenuItem-root": {
                fontSize: "0.9rem",
              },
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={handleSetting}
            sx={{
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#1B1035" },
            }}
          >
            <ListItemIcon sx={{ color: "#fff", minWidth: "32px" }}>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem
            onClick={handleDialog}
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              mt: 1,
              "&:hover": { backgroundColor: "#1B1035" },
            }}
          >
            <ListItemIcon sx={{ color: "#aaa", minWidth: "32px" }}>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Log out
          </MenuItem>
        </Menu>
      </Box>
      <CustomDialog
        open={openDialog}
        handleClose={closeDialog}
        content={<LogoutDialog handleClose={closeDialog}/>}
      />
    </Box>
  );
}
