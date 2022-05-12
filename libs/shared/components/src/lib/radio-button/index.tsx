import {FC} from "react";
import {IRadio} from "./types";
import {styled} from "@mui/material/styles";
import Radio, {RadioProps} from "@mui/material/Radio";
import RadioGroup, {RadioGroupProps} from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const BpIcon = styled("span")`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border: 2px solid var(--grey-dark);
    display: block;
    background: none;
    input:disabled ~ & {
        opacity: 0.3;
        poiner-events: none;
    }
`;
const BpCheckedIcon = styled(BpIcon)`
    background-color: #367bf5;
    border: none;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='9' viewBox='0 0 10 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.38867 2.74528L4.44423 6.91195L9.16645 1.07861' stroke='white' stroke-width='2'/%3E%3C/svg%3E");\
    background-position: 50% 55%;
    background-repeat: no-repeat;
    input:hover ~ & {
        background-color: #4883ed;
    }
`;

const BpRadio = (props: RadioProps) => {
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    );
};

const RadioStyled = styled(BpRadio)`
    padding: 4px;
    & + .MuiTypography-root {
        font-size: calc(var(--fz) - 1px);
    }
`;

interface IRadioButtons extends RadioGroupProps {
    radioArr: IRadio[];
    classRadio?: string;
}

const RadioButtons: FC<IRadioButtons> = ({radioArr, classRadio, ...props}) => {
    return (
        <RadioGroup data-class={classRadio} {...props}>
            {radioArr.map((radio) => (
                <FormControlLabel
                    key={radio.id}
                    value={radio.value}
                    label={radio.label}
                    control={<RadioStyled />}
                />
            ))}
        </RadioGroup>
    );
};

export const RadioButtonsStyled = styled(RadioButtons)`
    margin: 0 0 20px;
    > .MuiFormControlLabel-root {
        margin: 0;
    }
    > .MuiFormControlLabel-root:not(:last-child) {
        margin: 0 0 16px;
    }
    &.MuiFormGroup-row > .MuiFormControlLabel-root:not(:last-child) {
        margin: 0 24px 0 0;
    }
`;
