import {styled} from "@mui/material/styles";
import Popper, {PopperProps} from "@mui/material/Popper";
import {FC} from "react";

export const PopperComponent: FC<PopperProps> = styled(Popper)`
    &#menu-top {
        z-index: 15;
        background: var(--accent);
        padding: 16px;
        color: var(--white);
        font-size: calc(var(--fz) - 3px);
        border-radius: 0;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }
    &#menu-top .MuiPaper-root {
    }
`;
