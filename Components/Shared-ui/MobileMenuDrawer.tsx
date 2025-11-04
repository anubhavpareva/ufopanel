import {
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
} from "@mui/material";
import CustomText from "./CustomText";
import { menuItems } from "@/Constants/data";
import Link from "next/link";
import Image from "next/image";
import CustomDialog from "./CustomDialog";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutDialog from "../Dialog-content/LogoutDialog";
import { useSelector } from "react-redux";


interface MobileMenuDrawerProps {
  drawerOpen: boolean;
  toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetting: () => void;
  handleDialog:()=>void;
  openDialog:boolean;
  closeDialog:()=>void;
}

export default function MobileMenuDrawer({
  drawerOpen,
  toggleDrawer,
  handleSetting,
  handleDialog,
  openDialog,
  closeDialog
}: MobileMenuDrawerProps) {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 250,
            backgroundColor: "#0A0A1A",
            color: "#fff",
            borderRadius: "0 12px 12px 0",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <CustomText text="Menu" fw500 h5 />
          <IconButton onClick={() => toggleDrawer(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <Stack alignItems="center" spacing={1} sx={{ py: 3 }}>
          <CustomText text={user?.name || "User"} fw400 h5 />
        </Stack>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
        {menuItems.map((item) => (
          <Link href={item.url} key={item.text}>
            <MenuItem
              sx={{
                borderRadius: "8px",
                mt: 1,
                "&:hover": { backgroundColor: "#1B1035" },
              }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: "32px" }}>
                <Image src={item.icon} alt={item.text} width={24} height={24} />
              </ListItemIcon>
              {item.text}
            </MenuItem>
          </Link>
        ))}

        <MenuItem
          onClick={handleSetting}
          sx={{
            borderRadius: "8px",
            mt: 1,
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
      </Drawer>

      {/* Logout Confirmation Dialog */}
      <CustomDialog
        open={openDialog}
        handleClose={closeDialog}
        content={<LogoutDialog handleClose={closeDialog} />}
      />
    </>
  );
}
