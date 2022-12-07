import styled from "@emotion/styled";

export const RootContainer = styled("div")`
    flex-direction: column;
    display: flex;

    min-height: 100%;
    width: 100%;
    max-width: var(--xxxl);
    margin: 0 auto;
    padding: 0 0.625rem;
    @media (min-width: 87.5rem) {
        
    }
    @media (max-width: 87.5rem /*--q-xxl*/) {
        max-width: var(--xl);
        padding: 0;
    }
    @media (max-width: 75rem /*--q-xl*/) {
        max-width: var(--l);
    }
    @media (max-width: 62rem /*--q-l*/) {
        max-width: var(--m);
    }
    @media (max-width: 48rem /*--q-m*/) {
        max-width: var(--s);
        padding: 0 0.5rem;
        box-sizing: border-box;
    }
`;
