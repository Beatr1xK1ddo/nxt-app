import styled from "@emotion/styled";

export const NotificationOptions = styled.section`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    > div {
        width: 50%;
        box-sizing: border-box;
        @media (min-width: 62.5rem) {
            width: 42%;
        }
        &:last-of-type {
            padding: 0 0 0 1rem;
        }
    }
`;
