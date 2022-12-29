import React, {FC, useCallback, useMemo} from "react";
import {Snackbar} from "@mui/material";

import {ENotificationType, Optional, StringId} from "@nxt-ui/cp/types";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {useNotificationControls, useNotifications} from "@nxt-ui/cp/hooks";

import {styled} from "@mui/system";

const NotificationContainer = styled("div")<{error: boolean}>`
    & .MuiSnackbarContent-message {
        color: ${({error}) => (error ? "red" : "white")};
        font-weight: 600;
    }
`;

const IconRounded = styled(Icon)<{duration: Optional<number>}>`
    display: ${({duration}) => (duration ? "block" : "none")};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    stroke-dasharray: 115;
    stroke-dashoffset: 0;
    ${({duration}) => (duration ? `animation: hide ${duration / 1000}s linear forwards` : "")};

    & circle {
        r: 45%;
        stroke: #367bf5;
        stroke-width: 2px;
        cx: 50%;
        cy: 50%;
    }

    @keyframes hide {
        to {
            stroke-dashoffset: -115;
        }
    }
`;

const CloseBtn = styled(Button)`
    transform: rotate(-90deg);
`;

const CloseAction = ({id, duration}: {id: StringId; duration: Optional<number>}) => {
    const {hide} = useNotificationControls();

    const handleClose = useCallback(() => hide(id), [hide, id]);

    return (
        <CloseBtn data-type="btn-icon" onClick={handleClose}>
            <Icon name="clear" />
            <IconRounded name="circle" duration={duration} />
        </CloseBtn>
    );
};
type INotificationProps = {
    error?: ENotificationType;
    message: string;
    id: string;
    index: number;
    duration: Optional<number>;
};
export const Notification: FC<INotificationProps> = ({message, id, index, duration, error}) => {
    const offset = useMemo(() => ({transform: `translateY(${index * -60}px)`}), [index]);
    const {hide} = useNotificationControls();

    const closeHandler = useCallback(() => hide(id), [hide, id]);

    return (
        <NotificationContainer error={error === ENotificationType.error}>
            <Snackbar
                open
                onClose={closeHandler}
                autoHideDuration={duration}
                message={message}
                style={offset}
                action={<CloseAction id={id} duration={duration} />}
            />
        </NotificationContainer>
    );
};

export const Notifications: FC = () => {
    const {visible} = useNotifications();

    const renderElem = useMemo(() => {
        if (visible && visible?.length) {
            return (
                <>
                    {visible.map((notification, index) => (
                        <Notification
                            key={notification.id}
                            duration={notification.duration}
                            index={index}
                            message={notification.message}
                            error={notification.type}
                            id={notification.id}
                        />
                    ))}
                </>
            );
        }
        return null;
    }, [visible]);

    return renderElem;
};
