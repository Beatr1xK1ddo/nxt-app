import {Button, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {FC} from "react";

type ComponentProps = {onClick?(): void};

export const MonitoringButton: FC<ComponentProps> = ({onClick}) => {
    return (
        <TooltipComponent
            className="white-tooltip"
            arrow={true}
            title={
                <div>
                    <p className="heading">Monitoring</p>
                </div>
            }>
            <div>
                <Button data-type="btn-icon" onClick={onClick}>
                    <Icon name="chart" />
                </Button>
            </div>
        </TooltipComponent>
    );
};
