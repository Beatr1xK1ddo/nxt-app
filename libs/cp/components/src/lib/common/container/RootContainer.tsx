import styled from "@emotion/styled";

export const RootContainer = styled("div")`
    flex-direction: column;
    display: flex;
    min-height: 100%;
    width: 100%;
    margin: 0 auto;
    padding: 0 1.5rem;
    box-sizing: border-box;
    @media (max-width: 48rem /*--q-m*/) {
        padding: 0 0.8rem;
    }
`;
