import {InputText} from "@nxt-ui/components";
import {isIEmailDelivery, userNotificationFormActions, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {ChangeEvent, FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";

export const EmailOutput: FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector(userNotificationSelectors.output);

    const setEmail = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(userNotificationFormActions.setOutputEmail(event.target.value));
        },
        [dispatch]
    );

    if (isIEmailDelivery(filter.value)) {
        return <InputText label="Email" value={filter.value.email} onChange={setEmail} />;
    }
    return null;
};
