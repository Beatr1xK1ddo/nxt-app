import styled from "@emotion/styled";
import {FC} from "react";
import {BlueText} from "../styled";

const AppTitleText = styled.p`
    margin: 0;
    color: #faa74a;

    & > span {
        margin-left: 7px;
    }
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
