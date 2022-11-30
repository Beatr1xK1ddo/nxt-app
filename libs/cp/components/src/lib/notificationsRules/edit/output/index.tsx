import {Button, Accordion, Dropdown, InputText} from "@nxt-ui/components";
import {FlexHolder} from "@nxt-ui/cp/components";
import {FC} from "react";

export const NotificationRuleOutput: FC = () => {
    return (
        <Accordion className="accordion-ui" active header={"OUTPUT"} defaultExpanded>
            <FlexHolder justify="flex-start" className="notification-elements notification-output">
                <Dropdown label="OUTPUT TYPE" />
                <InputText label="E-MAIl" />
                <span className="text-add">
                    You'd be getting <br />
                    <em>~25</em> messages daily.
                </span>
            </FlexHolder>
            <FlexHolder justify="flex-start" className="notification-elements notification-output-last">
                <Dropdown label="RULE NAME" />
                <Button disabled={true}>Clear rule</Button>
                <Button data-type="btn-gray">Clear all</Button>
                <Button data-type="btn-border" style={{color: "var(--grey-dark)"}}>
                    Cancel
                </Button>
            </FlexHolder>
        </Accordion>
    );
};
