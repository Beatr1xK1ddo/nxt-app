import {IInputTextProps, InputText} from "@nxt-ui/components";
import {isISmsDelivery, userNotificationFormActions, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {ChangeEvent, FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IMaskMixin, IMask} from "react-imask";

const MaskedTextField = IMaskMixin<
    IMask.AnyMaskedOptions, // Mask options
    false, // Unmask?
    string, // value type
    HTMLInputElement, // wrapped element type
    IInputTextProps // here is your custom props
>(({inputRef, defaultValue, ...otherProps}) => (
    <InputText {...otherProps} variant="outlined" inputRef={inputRef} value={defaultValue} />
));

export const SmsOutput: FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector(userNotificationSelectors.output);
    const filterError = useSelector(userNotificationSelectors.outputErrors);

    const setPhone = useCallback(
        (value: string, mask: IMask.InputMask<IMask.AnyMaskedOptions>) => {
            dispatch(userNotificationFormActions.setOutputPhonenumber(mask.unmaskedValue));
        },
        [dispatch]
    );

    if (isISmsDelivery(filter.value)) {
        return (
            <MaskedTextField
                unmask={false}
                mask={"+{1} (000) 000-00-00"}
                error={filterError?.value?.["phoneNumber"]?.error}
                helperText={filterError?.value?.["phoneNumber"]?.helperText}
                label="phone"
                value={filter.value.phoneNumber}
                onAccept={setPhone}
            />
        );
    }
    return null;
};
