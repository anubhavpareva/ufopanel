import { colors } from "@/Constants/colors";
import { Dialog, DialogContent } from "@mui/material";
import type { JSX, ReactNode } from "react";
interface CustomDialogProps {
  handleClose: (value: string) => void;
  open:boolean;
  content:ReactNode;
}
export default function CustomDialog(props:CustomDialogProps): JSX.Element {
    const {handleClose, open, content} = props;
    return (
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          "& .MuiPaper-root": {
            borderRadius:"24px",
            py:2,
            minWidth:"45%",
            backgroundColor:colors.gray1000
          },
        }}
      >
        <DialogContent>{content}</DialogContent>
      </Dialog>
    );
}