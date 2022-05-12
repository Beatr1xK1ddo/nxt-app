// import Checkbox, {CheckboxProps} from "@mui/material/Checkbox";
// import {FC} from "react";
// import {styled} from "@mui/material/styles";

// export const CheckboxComponent: FC<CheckboxProps> = styled(Checkbox)`
//     padding: 0;
// `;
import {FC} from "react";
import {IRadio} from "./types";
import {styled} from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup, {RadioGroupProps} from "@mui/material/RadioGroup";
import FormControlLabel, {FormControlLabelProps} from "@mui/material/FormControlLabel";

interface IRadioButtons extends RadioGroupProps {
    radioArr: IRadio[];
    classRadio?: string;
    defaultValue: string;
    name: string;
}
// const RadioGroupComponent: FC<RadioGroupProps> = styled(RadioGroup)`
//     padding: 0;
// `;
// type IFooBar = IRadioButtons & RadioGroupProps;

export const RadioButtons: FC<IRadioButtons> = ({radioArr, ...props}) => {
    return (
        <RadioGroup aria-labelledby="buttons-group" {...props}>
            {radioArr.map((radio) => (
                <FormControlLabel
                    key={radio.id}
                    value={radio.value}
                    label={radio.label}
                    control={<Radio />}
                />
            ))}
        </RadioGroup>
    );
};
