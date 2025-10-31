import { colors } from "@/Constants/colors";
import { TextField, type TextFieldProps } from "@mui/material";
import { styled, type Theme } from "@mui/material/styles";

export const StyledTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({ theme }: { theme: Theme }) => ({
  "& .MuiInputBase-root": {
    backgroundColor: colors.voilet900,
    color: colors.gray900,
    borderRadius: '48px',
    "&:focus": {
      outline: "none",
      border: "none",
    },
  },

  "& .MuiOutlinedInput-root": {
    
    "& .MuiOutlinedInput-notchedOutline": {
      border: `1.5px solid ${colors.gray700}`,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: `1.5px solid ${colors.black50}`,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${colors.white500}`,
    },
    "& legend": {
      maxWidth: 0,
      transition: "max-width 0.1s ease-in-out",
     padding:0,
     margin:0

    },
    "&.Mui-focused legend": {
      maxWidth: "100%!important",
      backgroundColor:"blue",
      padding:0,
     margin:0,
     width:"auto",
     
    },
  },

  "& .MuiSvgIcon-root": {
    fill: colors.gray700,
  },

  "& .Mui-error": {
    backgroundColor: "#FEF3F2",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1.5px solid #F97066",
    },
  },

  "& .MuiFormLabel-root.Mui-error": {
    backgroundColor: "white",
    fontSize: "14px",
    color: "black",
    fontWeight: 500,
  },

  "& .MuiFormLabel-root": {
    fontSize: "12px",
    marginTop: "-1px",
    color:colors.gray900,

  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: colors.white500, // label color when focused
    backgroundColor:colors.gray800,
    fontSize:16,
  },
  
  "& .MuiFormHelperText-root": {
    fontSize: 12,
    marginLeft: 0,

    backgroundColor: "transparent",
    border: "none",
  },
}));
