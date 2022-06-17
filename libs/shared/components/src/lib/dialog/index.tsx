import {FC} from "react";
import {Button} from "../button";
import {Icon} from "@nxt-ui/icons";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {IDialogCustom} from "./types";
import clsx from "clsx";
import "./index.css";

export const DialogComponent: FC<IDialogCustom> = ({
    className,
    dialogText,
    dialogHeading,
    children,
    isDialogActions,
    approveDialog,
    closeDialog,
    ...props
}) => {
    return (
        <Dialog
            className={clsx("dialog-box", className && className)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            {...props}>
            <Button data-type="btn-icon" onClick={closeDialog}>
                <Icon name="clear" />
            </Button>
            {dialogHeading ? <DialogTitle id="alert-dialog-title">{dialogHeading}</DialogTitle> : null}
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{dialogText}</DialogContentText>
                {children}
            </DialogContent>
            {isDialogActions ? (
                <DialogActions>
                    <Button data-type="btn-green" onClick={approveDialog}>
                        Agree
                    </Button>
                    <Button data-type="btn-gray" onClick={closeDialog}>
                        Disagree
                    </Button>
                </DialogActions>
            ) : null}
        </Dialog>
    );
};
