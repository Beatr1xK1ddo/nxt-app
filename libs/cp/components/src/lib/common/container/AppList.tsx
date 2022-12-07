import styled from "@emotion/styled";

export const AppList = styled("ul")`
    column-count: 3;
    page-break-inside: avoid;
    margin: 0 0 0.9375rem;
    > .app-log {
        background: var(--bluer);
        padding: 1rem 0.5rem 0.5rem;
        border-radius: 0.5rem;
        margin: 0 0 0.9375rem;
        -moz-column-break-inside: avoid;
        break-inside: avoid;
        width: 100%;
    }
    @media (max-width: 75rem) {
        column-count: 2;
    }
    @media (max-width: 48rem) {
        column-count: 1;
    }
`;
