import Link from "next/link";
import CustomText from "./CustomText";
import { colors } from "@/Constants/colors";

interface CustomLinkProps {
  title: string;
  link: string;
  type?: number;
}

export default function CustomLink({ title, link, type=1 }: CustomLinkProps) {
  switch(type){
    case 1:
      return (
        <Link href={link}>
          <CustomText text={title} color={colors.blue100} p1 fw700 />
        </Link>
      );
      case 2:
        return (
          <Link href={link}>
            <CustomText text={title}  p2 fw400 />
          </Link>
        );
      default:
        return (
          <Link href={link}>
            <CustomText text={title} color={colors.blue100} p1 fw700 />
          </Link>
        );
  }
  
}
