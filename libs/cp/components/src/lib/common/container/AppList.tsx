import styled from "@emotion/styled";

export const AppList = styled("ul")`
    column-count: 3;
    page-break-inside: avoid;
    margin: 0 0 15px;
    > .app-log {
        background: var(--bluer);
        padding: 16px 8px 8px;
        border-radius: 8px;
        margin: 0 0 15px;
        -moz-column-break-inside: avoid;
        break-inside: avoid;
        width: 100%;
    }
    @media (max-width: 1200px) {
        column-count: 2;
    }
    @media (max-width: 768px) {
        column-count: 1;
    }
`;
