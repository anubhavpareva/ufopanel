'use client'

import { Stack } from "@mui/material"
import Image from "next/image"
import CustomText from "./CustomText"
import { icons } from "@/Constants/icons"

interface CustomCheckboxProps{
    text:string;
    isCheck:boolean;
    setCheck: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CustomCheckbox({text, isCheck, setCheck}:CustomCheckboxProps){
    return(
        <Stack flexDirection={'row'} gap={1}>
            <Image src={isCheck ? icons.checked : icons.unChecked} alt="check" width={20} height={20} onClick={()=>setCheck(!isCheck)}/>
            <CustomText text={text} p2 fw400/>
        </Stack>
    )
}