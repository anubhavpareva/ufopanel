import { colors } from "@/Constants/colors";
import { Avatar, Stack } from "@mui/material";
import CustomText from "../Shared-ui/CustomText";
import { settingMenuItems } from "@/Constants/data";
import Image from "next/image";
import React from "react";

interface LeftSectionProps{
    selected:string;
    setSelected:React.Dispatch<React.SetStateAction<string>>;
}

export default function LeftSection({selected, setSelected}:LeftSectionProps){
    return(
        <Stack
          width={{ xs: "100%", md: "312px" }}
          height={400}
          maxHeight={400}
          flex={"0 0 auto"}
          justifyContent={'center'}
          p={"12px"}
          gap={"12px"}
          sx={{ backgroundColor: colors.gray1000, borderRadius: "32px" }}
        >
          <Stack
            flexDirection={"row"}
            p={"12px"}
            gap={"16px"}
            sx={
              selected === "profile"
                ? {
                    backgroundColor: colors.violet300,
                    borderRadius:'16px',
                    border: 1,
                    borderColor: colors.gray600,
                    cursor:'pointer'
                  }
                : {cursor:'pointer'}
            }
            onClick={() => setSelected("profile")}
          >
            <Avatar
              sx={{
                backgroundColor: colors.black100,
                color: "#fff",
                width: 44,
                height: 44,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              RS
            </Avatar>
            <Stack gap={"4px"}>
              <CustomText text="Rober smith" fw400 p1 />
              <CustomText text="robertsmith@gmail.com" fw400 p2 />
            </Stack>
          </Stack>
          {settingMenuItems.map((item) => (
            <Stack
              key={item.text}
              flexDirection={"row"}
              alignItems={"center"}
              p={"12px"}
              gap={"16px"}
              sx={
                selected === item.value
                  ? {
                      backgroundColor: colors.violet300,
                      borderRadius:'16px',
                      border: 1,
                      borderColor: colors.gray600,
                      cursor:'pointer'
                    }
                  : {
                    cursor:'pointer'
                  }
              }
              onClick={() => setSelected(item.value)}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  backgroundColor: colors.black100,
                  color: "#fff",
                  width: 40,
                  height: 40,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  borderRadius: "100px",
                }}
              >
                <Image src={item.icon} alt={item.text} width={24} height={24} />
              </Stack>
              <Stack gap={"4px"}>
                <CustomText text={item?.text} fw400 p1 />
              </Stack>
            </Stack>
          ))}
        </Stack>
    )
}