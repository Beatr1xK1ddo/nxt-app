import styled from "@emotion/styled";
import {FC} from "react";

const AppTitleText = styled.p`
    margin: 0;
    color: #faa74a;

    & > span {
        margin-left: 0.4375rem;
    }
`;
const BlueText = styled.span`
    color: var(--action);
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
