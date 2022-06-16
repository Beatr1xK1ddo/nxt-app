import {DialogProps} from "@mui/material/Dialog";

export interface IDialogCustom extends DialogProps {
    className?: string;
    children?: React.ReactChild | React.ReactNode;
    dialogHeading?: string;
    dialogText: string;
    closeDialog(): void;
    approveDialog?(): void;
}
