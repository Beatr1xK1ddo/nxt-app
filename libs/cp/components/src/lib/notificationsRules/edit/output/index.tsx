import {SelectChangeEvent} from "@mui/material";
import {Accordion, Dropdown} from "@nxt-ui/components";
import {userNotificationFormActions, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {FlexHolder} from "@nxt-ui/cp/components";
import {ENotificationDeliveryChannel} from "@nxt-ui/cp/types";
import {FC, useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {CrmOutput} from "./crmOutput";
import {EmailOutput} from "./emailOutput";
import {NxtOutput} from "./nxtOutput";
import {SlackOutput} from "./slackOutput";
import {SmsOutput} from "./smsOutput";

export const NotificationRuleOutput: FC = () => {
    const dispatch = useDispatch();
    const {id: idFromUrl} = useParams<"id">();
    const filter = useSelector(userNotificationSelectors.output);
    const filterErrors = useSelector(userNotificationSelectors.outputErrors);

    const setType = useCallback(
        (event: SelectChangeEvent<unknown>) => {
            dispatch(userNotificationFormActions.setOutputType(event.target.value as ENotificationDeliveryChannel));
        },
        [dispatch]
    );

    const renderType = useMemo(() => {
        if (filter.type === ENotificationDeliveryChannel.sms) {
            return <SmsOutput />;
        } else if (filter.type === ENotificationDeliveryChannel.slack) {
            return <SlackOutput />;
        } else if (filter.type === ENotificationDeliveryChannel.email) {
            return <EmailOutput />;
        } else if (filter.type === ENotificationDeliveryChannel.crm_ticket) {
            return <CrmOutput />;
        } else {
            return <NxtOutput />;
        }
    }, [filter.type]);

    useEffect(() => {
        if (idFromUrl) {
            dispatch(userNotificationFormActions.getNotificationsRule(idFromUrl));
        }
    }, [idFromUrl, dispatch]);

    return (
        <Accordion className="accordion-ui" active header={"OUTPUT"} defaultExpanded>
            <FlexHolder justify="flex-start" className="notification-elements notification-output">
                <Dropdown
                    error={filterErrors?.type?.error}
                    helperText={filterErrors?.type?.helperText}
                    onChange={setType}
                    value={filter.type}
                    label="OUTPUT TYPE"
                    values={Object.keys(ENotificationDeliveryChannel)}
                />
                {renderType}
                {/* <InputText label="E-MAIl" value={filter?.email} onChange={setEmail} /> */}
                <span className="text-add">
                    You'd be getting <br />
                    <em>~25</em> messages daily.
                </span>
            </FlexHolder>
        </Accordion>
    );
};
