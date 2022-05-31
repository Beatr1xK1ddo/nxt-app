import {MenuProps} from "@mui/material/Menu";

export interface IMenuItem {
    id: number;
    content: React.ReactChild | React.ReactNode;
}

export interface IMenuComponent extends MenuProps {
    className?: string;
}
