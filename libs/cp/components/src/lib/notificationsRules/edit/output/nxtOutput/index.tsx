import {InputText} from "@nxt-ui/components";
import {isIUserIdDelivery, userNotificationFormActions, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {ChangeEvent, FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";

export const NxtOutput: FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector(userNotificationSelectors.output);

    const setUserId = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(userNotificationFormActions.setOutputUserId(event.target.value));
        },
        [dispatch]
    );
    if (isIUserIdDelivery(filter.value)) {
        return <InputText label="User Id" value={filter.value.userId} onChange={setUserId} />;
    }
    return null;
};
