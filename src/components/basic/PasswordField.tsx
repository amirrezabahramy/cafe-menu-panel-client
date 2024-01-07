import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

type TProps = Omit<TextFieldProps, "type" | "InputProps">;

function PasswordField(props: TProps) {
  const [isShow, setIsShow] = useState(false);

  return (
    <TextField
      type={isShow ? "text" : "password"}
      InputProps={{
        endAdornment: isShow ? (
          <IconButton
            onClick={() => {
              setIsShow(false);
            }}
          >
            <Visibility />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              setIsShow(true);
            }}
          >
            <VisibilityOff />
          </IconButton>
        ),
      }}
      {...props}
    />
  );
}

export default PasswordField;
