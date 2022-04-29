import {TextFieldProps} from "@mui/material/TextField/TextField";
import {IIconNames} from "@nxt-ui/icons";

export type IInputTextProps = TextFieldProps & {
    icon?: IIconNames;
};
