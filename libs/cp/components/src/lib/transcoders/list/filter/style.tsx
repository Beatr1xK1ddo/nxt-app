import styled from "@emotion/styled";

export const FilterList = styled("div")`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 4px 16px 8px;
    > div:not(.filter-buttons) {
        margin: 0 0 24px;
        width: calc(100% / 6 - 10px);
    }
    @media (max-width: 992px) {
        > div:not(.filter-buttons) {
            width: calc(100% / 5 - 10px);
        }
        @media (max-width: 768px) {
            > div:not(.filter-buttons) {
                width: calc(100% / 3 - 10px);
            }
        }
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
