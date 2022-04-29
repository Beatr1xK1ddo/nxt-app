import {styled} from "@mui/material/styles";
import Popover, {PopoverProps} from "@mui/material/Popover";
import {FC} from "react";

export const PopoverComponent: FC<PopoverProps> = styled(Popover)`
    .MuiPaper-root {
        padding: 10px;
    }
`;
