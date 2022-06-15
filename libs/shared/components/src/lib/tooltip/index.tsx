import {FC, forwardRef} from "react";
import {styled} from "@mui/material/styles";
import Tooltip, {TooltipProps, tooltipClasses} from "@mui/material/Tooltip";

export const TooltipComponent = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} placement="top-start" classes={{popper: className}} />
))`
    & {
        .MuiTooltip-tooltip {
            color: (--white);
            background: var(--blacked);
            .MuiTooltip-arrow:before {
                background: var(--blacked);
            }
        }
    }
    &.white-tooltip {
        max-width: 145px;
        font-size: calc(var(--fz) - 2px);
        .MuiTooltip-tooltip {
            color: var(--gray-dark);
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
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
                font-size: calc(var(--fz) - 4px);
            }
            .MuiTooltip-arrow:before {
                background: var(--white);
            }
        }
    }
`;
