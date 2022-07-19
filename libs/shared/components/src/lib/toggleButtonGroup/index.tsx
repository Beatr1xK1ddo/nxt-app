import styled from "@emotion/styled";
import {FC} from "react";
import {IToggleButton} from "./types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {ToggleButtonGroupProps} from "@mui/material/ToggleButtonGroup";

interface IToggleBtnGroup extends ToggleButtonGroupProps {
    btnsArr: IToggleButton[];
    className?: string;
}

const ToggleButtonGroupCustom: FC<IToggleBtnGroup> = ({className, btnsArr, ...props}) => {
    return (
        <ToggleButtonGroup className={`${className}`} {...props}>
            {btnsArr.map((btn) => (
                <ToggleButton value={btn.value}>{btn.text}</ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

export const ToggleButtonGroupComponent = styled(ToggleButtonGroupCustom)`
    &.text-buttons-group {
        .MuiButtonBase-root {
            padding: 6px;
            text-transform: none;
            font-size: calc(var(--fz) - 4px);
        }
    }
`;
