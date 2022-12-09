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
            max-width: 100%;
            color: (--white);
            background: var(--blacked);
            .MuiTooltip-arrow:before {
                background: var(--blacked);
            }
        }
    }
    &.transfer-tooltip {
        .MuiTooltip-tooltip {
            padding: 0.75rem !important;
        }
    }
    &.white-tooltip {
        width: auto;
        font-size: calc(var(--fz) - 0.125rem);
        .MuiTooltip-tooltip {
            color: var(--gray-dark);
            box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
            background: var(--white);
            > *:not(:last-child) {
                margin: 0 0 0.5rem;
            }
            dl {
                display: flex;
                dt {
                    margin: 0 0.25rem 0 0;
                }
            }
            .heading {
                font-size: var(--fz);
            }
            a {
                font-size: calc(var(--fz) - 0.125rem);
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
