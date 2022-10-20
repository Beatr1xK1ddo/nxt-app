import styled from "@emotion/styled";
import {BlueText} from "../styled";

const FieldTitleText = styled.p`
    margin: 0;
    color: #919699;

    & > span {
        margin-left: 7px;
    }
`;

export const FieldLabel = ({text, title}: {text: string | number; title: string}) => {
    return (
        <FieldTitleText>
            {title}
            <BlueText>{text}</BlueText>
        </FieldTitleText>
    );
};
