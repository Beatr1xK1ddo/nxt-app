import styled from "@emotion/styled";

const FieldTitleText = styled.p`
    margin: 0;
    color: var(--grey-dark);
    .MuiTreeItem-root[aria-expanded="true"] > .Mui-expanded > .MuiTreeItem-label & {
        color: var(--r-premium);
    }
    & > span {
        margin-left: 7px;
    }
`;

const BlueText = styled.span`
    color: var(--action);
    font-size: calc(var(--fz) - 4px);
`;

export const FieldLabel = ({text, title}: {text: string | number; title: string}) => {
    return (
        <FieldTitleText>
            {title}
            <BlueText>{text}</BlueText>
        </FieldTitleText>
    );
};
