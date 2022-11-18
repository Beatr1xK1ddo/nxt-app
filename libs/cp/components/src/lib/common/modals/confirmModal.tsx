import {FC, useCallback, useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import {Button, NxtDialog} from "@nxt-ui/components";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import {useBlocker} from "@nxt-ui/cp/hooks";
import {useLocation, useNavigate} from "react-router";
import {Transition} from "history";

type IComponentProps = {
    title: string;
    text: string;
    when: boolean;
};

export const ConfirmModal: FC<IComponentProps> = ({title, text, when}) => {
    const [confirm, setConfirm] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [navigateTo, setNavigateTo] = useState<Transition>();
    const currentLocation = useLocation();
    const navigate = useNavigate();
    const navigationBlocker = useCallback(
        (navigateTo) => {
            if (!confirm && navigateTo.location.pathname !== currentLocation.pathname) {
                setOpenModal(true);
                setNavigateTo(navigateTo);
                return false;
            }
            return true;
        },
        [confirm, currentLocation]
    );

    const cancelNavigation = useCallback(() => {
        setConfirm(false);
        setOpenModal(false);
    }, []);

    const confirmNavigation = useCallback(() => {
        setConfirm(true);
        setOpenModal(false);
    }, []);

    useEffect(() => {
        if (confirm && navigateTo) {
            navigate("/ipbes");
        }
        return () => {
            setConfirm(false);
        };
    }, [confirm, navigateTo, navigate]);

    useBlocker(navigationBlocker, when);

    return (
        <NxtDialog open={openModal} onClose={cancelNavigation}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button data-type="btn-green" onClick={confirmNavigation}>
                    Agree
                </Button>
                <Button data-type="btn-gray" onClick={cancelNavigation}>
                    Disagree
                </Button>
            </DialogActions>
        </NxtDialog>
    );
};
