"use client";

import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Image from "next/image";
import { icons } from "@/Constants/icons";
import { menuItems } from "@/Constants/data";
import Link from "next/link";

const SidebarContainer = styled(Box)(() => ({
  width: "250px",
  flex: "0 0 auto",
  height: "100vh",
  color: "#FFFFFF",
  padding: "16px 0",
  flexDirection: "column",
  justifyContent: "flex-start",
//   boxShadow: "4px 0 20px rgba(0,0,0,0.3)",
}));

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: "12px",
  margin: "6px 12px",
  padding: "10px 16px",
  color: "#bdbdfd",
  gap:"12px",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  "&.Mui-selected": {
    backgroundColor: "#0F101D",
    color: "#fff",
    "& .MuiListItemIcon-root": {
      color: "#fff",
    },
  },
}));

export default function Sidebar() {
  const [selected, setSelected] = useState("Dashboard");
  return (
    <SidebarContainer sx={{display: {xs:'none', md:"flex"},}}>
      <Stack px={2}>
        <Image src={icons.logo} alt="Logo" width={50} height={50} />
      </Stack>
      <List>
        {menuItems.map((item) => (
          <Link href={item.url} key={item.text}>
          <StyledListItem
            selected={selected === item.text}
            onClick={() => setSelected(item.text)}
          >
            
            <Image src={item.icon} alt={item.text} width={24} height={24} />
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: 500,
              }}
            />
          </StyledListItem>
            </Link>
        ))}
      </List>
    </SidebarContainer>
  );
}
