import {FC} from "react";
import {Button} from "@nxt-ui/components";
import {FlexHolder} from "../index";
import "./event-box.css";

interface IEventBoxProps {
    heading: string;
    className?: string;
    children: React.ReactChild | React.ReactNode;
    btnFooter?: boolean;
}

export const EventBox: FC<IEventBoxProps> = ({heading, className, children, btnFooter}) => {
    return (
        <div className={className ? `${className} event-box` : "event-box"}>
            <FlexHolder>
                <h2>{heading}</h2>
                <Button>New event</Button>
            </FlexHolder>
            {children}
            {btnFooter ? (
                <FlexHolder justify="flex-start">
                    <Button icon="tick" iconBefore data-type="btn-border" style={{}}>
                        Drop changes and exit
                    </Button>
                    <Button data-type="btn-border" style={{}}>
                        Drop changes and exit
                    </Button>
                </FlexHolder>
            ) : null}
        </div>
    );
};
