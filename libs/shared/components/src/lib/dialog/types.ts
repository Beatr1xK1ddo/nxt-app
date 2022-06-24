import {DialogProps} from "@mui/material/Dialog";

export interface IDialogCustom extends DialogProps {
    className?: string;
    closeDialog?(): void;
    approveDialog?(): void;
}
