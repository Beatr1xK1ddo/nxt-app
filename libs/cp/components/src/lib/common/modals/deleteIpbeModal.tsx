import {FC} from "react";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import {Button, DialogComponent} from "@nxt-ui/components";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";

type IComponentProps = {
    onClose(): void;
    onAprove(): void;
    open: boolean;
    title: string;
    text: string;
};

export const DeleteIpbeModal: FC<IComponentProps> = ({onClose, onAprove, open, title, text}) => {
    return (
        <DialogComponent open={open} onClose={onClose}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button data-type="btn-green" onClick={onAprove}>
                    Agree
                </Button>
                <Button data-type="btn-gray" onClick={onClose}>
                    Disagree
                </Button>
            </DialogActions>
        </DialogComponent>
    );
};
