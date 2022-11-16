import styled from "@emotion/styled";
import {FC} from "react";

const AppTitleText = styled.p`
    margin: 0;
    color: #faa74a;

    & > span {
        margin-left: 7px;
    }
`;
const BlueText = styled.span`
    color: var(--action);
    font-size: calc(var(--fz) - 4px);
`;
type IAppLabelProps = {text: string; title: string};

export const AppLabel: FC<IAppLabelProps> = ({text, title}) => {
    return (
        <AppTitleText>
            {title}
            <BlueText>{text}</BlueText>
        </AppTitleText>
    );
};
