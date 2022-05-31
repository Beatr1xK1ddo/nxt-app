import {FC} from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {FlexHolder} from "../../container";

import "./index.css";

interface IEventBoxProps {
    heading: string;
    className?: string;
    children: React.ReactChild | React.ReactNode;
    btnFooter?: boolean;
    onClose?(): void;
}

export const EventBox: FC<IEventBoxProps> = ({heading, className, children, btnFooter, onClose}) => {
    return (
        <div className={className ? `${className} event-box` : "event-box"}>
            <Button data-type="btn-icon" onClick={onClose}>
                <Icon name="clear" />
            </Button>
            <FlexHolder className="event-heading">
                <h2>{heading}</h2>
                <Button data-type="btn-border">New event</Button>
            </FlexHolder>
            {children}
            {btnFooter ? (
                <FlexHolder className="btn-holder" justify="flex-start">
                    <Button data-type="btn-green" icon="tick" iconBefore>
                        Save changes
                    </Button>
                    <Button data-type="btn-gray">Drop changes and exit</Button>
                </FlexHolder>
            ) : null}
        </div>
    );
};
