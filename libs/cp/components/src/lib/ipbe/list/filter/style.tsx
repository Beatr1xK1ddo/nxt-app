import styled from "@emotion/styled";

export const FilterList = styled("div")`
    width: 100%;
    padding: 0.25rem 0 0.5rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0 0.625rem;
    @media (max-width: 93.75rem) {
        .filter-wrap & {
            grid-template-columns: repeat(5, 1fr);
        }
    }
    
    > div {
        margin: 0 0 1.5rem;
    }
    @media (max-width: 62rem) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 48rem) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const FilterButtons = styled("div")`
    width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
    margin: 0 0 1.5rem;
    @media (max-width: 62rem) {
        width: auto;
        margin-left: 0.625rem;
    }
    @media (max-width: 48rem) {
        margin-left: 0;
    }
`;
