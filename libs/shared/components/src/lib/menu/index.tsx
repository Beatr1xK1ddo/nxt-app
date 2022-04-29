import styled from "@emotion/styled";
import Menu, {MenuProps} from "@mui/material/Menu";
import {FC} from "react";

export const MenuComponent: FC<MenuProps> = styled(Menu)(`
  .MuiList-root {
    padding:0;
  }
`);
