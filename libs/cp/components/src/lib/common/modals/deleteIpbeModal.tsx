import {FC} from "react";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import {Button, DialogComponent} from "@nxt-ui/components";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";

type IComponentProps = {
    closeDialog(): void;
    approveDialog(): void;
    open: boolean;
};

export const DeleteIpbeModal: FC<IComponentProps> = ({closeDialog, approveDialog, open}) => {
    return (
        <DialogComponent open={open} closeDialog={closeDialog} approveDialog={approveDialog}>
            <DialogTitle id="alert-dialog-title">Delete item</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you shure that you whant to delete this item?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button data-type="btn-green" onClick={approveDialog}>
                    Agree
                </Button>
                <Button data-type="btn-gray" onClick={closeDialog}>
                    Disagree
                </Button>
            </DialogActions>
        </DialogComponent>
    );
};
