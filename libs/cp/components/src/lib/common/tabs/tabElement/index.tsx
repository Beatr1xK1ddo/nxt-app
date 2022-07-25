import {styled} from "@mui/material/styles";
import Tab, {TabProps} from "@mui/material/Tab";

type ITabProps = {
    iserror?: number;
} & TabProps;

export const TabElement = styled(({isError, ...props}: ITabProps) => <Tab {...props} />)`
    padding: 3px 9px;
    min-height: 32px;
    border-radius: 4px 4px 0 0;
    color: var(--action);
    background: var(--b-gblue);
    border: 1px solid var(--b-gblue);
    font: var(--font);
    font-weight: 600;
    border-bottom-width: 0;
    outline: none;
    margin: 0 4px 0 0;
    text-transform: none;
    min-width: 40px;
    &:after {
        content: "";
        height: 2px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--danger);
        display: none;
        display: ${({iserror}) => (iserror ? "block" : "none")};
    }
    @media (max-width: 1400px /*--q-xxl*/) {
        font-size: calc(var(--fz) - 2px);
    }
    @media (max-width: 1200px /*--q-xl*/) {
        font-size: calc(var(--fz) - 5px);
        padding: 3px 6px;
    }
    @media (max-width: 992px /*--q-l*/) {
    }
    @media (max-width: 768px /*--q-m*/) {
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
