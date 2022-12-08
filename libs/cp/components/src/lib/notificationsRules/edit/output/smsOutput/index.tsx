import {InputText} from "@nxt-ui/components";
import {isISmsDelivery, userNotificationFormActions, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {ChangeEvent, FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";

export const SmsOutput: FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector(userNotificationSelectors.output);

    const setPhone = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(userNotificationFormActions.setOutputPhonenumber(event.target.value));
        },
        [dispatch]
    );

    if (isISmsDelivery(filter.value)) {
        return <InputText label="Phone" value={filter.value.phoneNumber} onChange={setPhone} />;
    }
    return null;
};
