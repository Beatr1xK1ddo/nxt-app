import {FC} from "react";
import {styled} from "@mui/material/styles";
import Tab, {TabProps} from "@mui/material/Tab";

export const TabComponent: FC<TabProps> = styled(Tab)`
    padding: 0.1875rem 0.5625rem;
    min-height: 2rem;
    border-radius: 0.25rem 0.25rem 0 0;
    color: var(--action);
    background: var(--b-gblue);
    border: 0.0625rem solid var(--b-gblue);
    font: var(--font);
    font-size: var(--fz);
    font-weight: 600;
    border-bottom-width: 0;
    outline: none;
    margin: 0 0.25rem 0 0;
    text-transform: none;
    min-width: 2.5rem;
    @media (max-width: 87.5rem /*--q-xxl*/) {
        font-size: calc(var(--fz) - 0.125rem);
    }
    @media (max-width: 75rem /*--q-xl*/) {
        font-size: calc(var(--fz) - 0.3125rem);
        padding: 0.1875rem 0.375rem;
    }
    @media (max-width: 62rem /*--q-l*/) {
    }
    @media (max-width: 48rem /*--q-m*/) {
    }
    &:hover {
        background: var(--gblue) !important;
    }
    &[aria-selected="true"] {
        // border-color: rgba(0, 0, 0, 0.25);
        color: var(--blacked);
        background: none;
    }
    .form-container &[aria-selected="true"] {
        background: var(--white);
    }
`;
