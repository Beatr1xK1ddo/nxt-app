import {Button, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {styled} from "@mui/system";
import {FC} from "react";

type ComponentProps = {
    active?: boolean;
    onClick?(): void;
};

const RestartIcon = styled(Icon)<{active: number}>`
    && {
        cursor: ${({active}) => (active ? "pointer" : "initial")};

        & > path {
            fill: ${({active}) => (active ? "var(--action)" : "#919699")};
        }
    }
`;

export const MonitoringButton: FC<ComponentProps> = ({onClick, active}) => {
    return (
        <TooltipComponent className="card-text" arrow title={<div>Monitoring</div>}>
            <div>
                <Button data-type="btn-icon" onClick={onClick}>
                    <RestartIcon name="chart" active={active ? 1 : 0} />
                </Button>
            </div>
        </TooltipComponent>
    );
};
