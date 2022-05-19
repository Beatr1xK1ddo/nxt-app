import styled from "@emotion/styled";

export const RootContainer = styled("div")`
    flex-direction: column;
    display: flex;

    min-height: 100%;
    width: 100%;
    max-width: var(--xxl);
    margin: 0 auto;
    @media (max-width: 1400px /*--q-xxl*/) {
        max-width: var(--xl);
    }
    @media (max-width: 1200px /*--q-xl*/) {
        max-width: var(--l);
    }
    @media (max-width: 992px /*--q-l*/) {
        max-width: var(--m);
    }
    @media (max-width: 768px /*--q-m*/) {
        max-width: var(--s);
        padding: 0 8px;
        box-sizing: border-box;
    }
`;
