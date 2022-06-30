import {FC} from "react";
import {Button} from "../button";
import {Icon} from "@nxt-ui/icons";
import Dialog from "@mui/material/Dialog";
import {IDialogCustom} from "./types";
import clsx from "clsx";
import "./index.css";

export const NxtDialog: FC<IDialogCustom> = ({className, children, onClose, ...props}) => {
    return (
        <Dialog
            className={clsx("dialog-box", className && className)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={onClose}
            {...props}>
            <Button data-type="btn-icon" onClick={onClose}>
                <Icon name="clear" />
            </Button>
            {children}
        </Dialog>
    );
};
