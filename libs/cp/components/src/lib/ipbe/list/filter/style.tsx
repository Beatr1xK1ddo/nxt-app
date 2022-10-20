import styled from "@emotion/styled";

export const FilterList = styled("div")`
    width: 100%;
    padding: 4px 16px 8px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0 10px;
    > div {
        margin: 0 0 24px;
    }
    @media (max-width: 992px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const FilterButtons = styled("div")`
    width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
    margin: 0 0 24px;
    @media (max-width: 992px) {
        width: auto;
        margin-left: 10px;
    }
    @media (max-width: 768px) {
        margin-left: 0;
    }
`;
