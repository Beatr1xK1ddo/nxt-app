import * as React from "react";
import {styled} from "@mui/material/styles";
import Tooltip, {TooltipProps, tooltipClasses} from "@mui/material/Tooltip";

export const TooltipComponent = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} arrow placement="top-start" classes={{popper: className}} />
))(({theme}) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "var(--blacked)",
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "var(--blacked)",
        color: "#ffffff",
        padding: "4px 8px",
    },
}));
