import styled from "@emotion/styled";
import {FC} from "react";
import {IToggleButton} from "./types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {ToggleButtonGroupProps} from "@mui/material/ToggleButtonGroup";

interface IToggleBtnGroup extends ToggleButtonGroupProps {
    values: IToggleButton[];
    className?: string;
}

const ToggleButtonGroupCustom: FC<IToggleBtnGroup> = ({className, values, ...props}) => {
    return (
        <ToggleButtonGroup className={`${className}`} {...props}>
            {values.map((item) => (
                <ToggleButton value={item.value}>{item.text}</ToggleButton>
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
