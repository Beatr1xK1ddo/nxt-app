import {NotificationRuleEdit} from "@nxt-ui/cp/components";
import {useRemoveChangeFormListener} from "@nxt-ui/cp/hooks";
import {FC} from "react";

export const NotificationRuleEditScreen: FC = () => {
    useRemoveChangeFormListener();
    return <NotificationRuleEdit />;
};
