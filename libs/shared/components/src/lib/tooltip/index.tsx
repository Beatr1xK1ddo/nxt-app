import {styled} from "@mui/material/styles";
import Tooltip, {TooltipProps} from "@mui/material/Tooltip";

export interface Tooltip extends TooltipProps {
    maxWidth?: number;
}

const Test = ({className, maxWidth, ...props}: Tooltip) => (
    <Tooltip
        title={props.title}
        children={props.children}
        arrow={props.arrow}
        leaveDelay={props.leaveDelay}
        enterDelay={props.enterDelay}
        placement="top-start"
        classes={{popper: className}}
    />
);

export const TooltipComponent = styled(Test)`
    & {
        .MuiTooltip-tooltip {
            color: (--white);
            background: var(--blacked);
            .MuiTooltip-arrow:before {
                background: var(--blacked);
            }
        }
    }
    &.transfer-tooltip {
        .MuiTooltip-tooltip {
            padding: 12px !important;
        }
    }
    &.white-tooltip {
        width: auto;
        font-size: calc(var(--fz) - 2px);
        .MuiTooltip-tooltip {
            color: var(--gray-dark);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            background: var(--white);
            > *:not(:last-child) {
                margin: 0 0 8px;
            }
            dl {
                display: flex;
                dt {
                    margin: 0 4px 0 0;
                }
            }
            .heading {
                font-size: var(--fz);
            }
            a {
                font-size: calc(var(--fz) - 2px);
            }
            .MuiTooltip-arrow:before {
                background: var(--white);
            }
        }
    }
    // &.transfer-tooltip {
    //     max-width: none;
    // }
`;
