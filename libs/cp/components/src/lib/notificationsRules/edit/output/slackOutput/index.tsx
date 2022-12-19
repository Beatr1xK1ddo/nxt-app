import {InputText} from "@nxt-ui/components";
import {isISlackDelivery, userNotificationFormActions, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {ChangeEvent, FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";

export const SlackOutput: FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector(userNotificationSelectors.output);
    const errors = useSelector(userNotificationSelectors.outputErrors);

    const setSlackUsername = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(userNotificationFormActions.setOutputUsername(event.target.value));
        },
        [dispatch]
    );
    const setSlackChannel = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(userNotificationFormActions.setOutputChannel(event.target.value));
        },
        [dispatch]
    );

    if (isISlackDelivery(filter.value)) {
        return (
            <>
                <InputText
                    error={errors?.value?.["channel"]?.error}
                    helperText={errors?.value?.["channel"]?.helperText}
                    label="Channel"
                    value={filter.value.channel}
                    onChange={setSlackChannel}
                />
                <InputText
                    error={errors?.value?.["username"]?.error}
                    helperText={errors?.value?.["username"]?.helperText}
                    label="Sender Name"
                    value={filter.value.username}
                    onChange={setSlackUsername}
                />
            </>
        );
    }
    return null;
};
