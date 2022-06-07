import {styled} from "@mui/material/styles";
import Popover, {PopoverProps} from "@mui/material/Popover";
import {FC} from "react";

export const PopoverComponent: FC<PopoverProps> = styled(Popover)`
    .MuiPaper-root {
        padding: 10px;
    }
    &#menu-top {
        z-index: 10;
    }
    &#menu-top .MuiPaper-root {
        background: var(--accent);
        padding: 16px;
        color: var(--white);
        font-size: calc(var(--fz) - 3px);
        border-radius: 0;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }
`;
