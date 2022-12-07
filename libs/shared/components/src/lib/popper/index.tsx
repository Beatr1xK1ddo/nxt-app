import {styled} from "@mui/material/styles";
import Popper, {PopperProps} from "@mui/material/Popper";
import {FC} from "react";

export const PopperComponent: FC<PopperProps> = styled(Popper)`
    min-height: 4.5rem;

    &#menu-top {
        z-index: 20;
        background: var(--blacked);
        padding: 1rem;
        color: var(--white);
        font-size: calc(var(--fz) - 0.1875rem);
        border-radius: 0;
        box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    }
`;
