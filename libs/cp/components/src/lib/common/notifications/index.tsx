import React, {useCallback} from "react";
import {Snackbar} from "@mui/material";

import {StringId} from "@nxt-ui/cp/types";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {useNotificationControls, useNotifications} from "@nxt-ui/cp/hooks";

const CloseAction = ({id}: {id: StringId}) => {
    const {hide} = useNotificationControls();

    const handleClose = useCallback(() => hide(id), [hide, id]);

    return (
        <Button data-type="btn-icon" onClick={handleClose}>
            <Icon name="clear" />
        </Button>
    );
};

export const Notifications = () => {
    const {visible} = useNotifications();

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {visible &&
                visible.map((notification, index) => (
                    <Snackbar
                        key={notification.id}
                        open
                        autoHideDuration={null}
                        message={notification.message}
                        style={{transform: `translateY(${index * -60}px)`}}
                        action={<CloseAction id={notification.id} />}
                    />
                ))}
        </>
    );
};
