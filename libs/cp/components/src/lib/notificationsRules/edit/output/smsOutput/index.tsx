import {InputText} from "@nxt-ui/components";
import {isISmsDelivery, userNotificationFormActions, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {ChangeEvent, FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IMaskInput} from "react-imask";

export const SmsOutput: FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector(userNotificationSelectors.output);
    const filterError = useSelector(userNotificationSelectors.outputErrors);

    const setPhone = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(userNotificationFormActions.setOutputPhonenumber(event.target.value));
        },
        [dispatch]
    );

    if (isISmsDelivery(filter.value)) {
        return (
            <InputText
                error={filterError?.value?.["phoneNumber"]?.error}
                helperText={filterError?.value?.["phoneNumber"]?.helperText}
                label="phone"
                value={filter.value.phoneNumber}
                onChange={setPhone}>
                <IMaskInput mask="+1 999 999 99 99" />
            </InputText>
        );
    }
    return null;
};
