import {FC} from "react";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import {styled} from "@mui/material/styles";
import {Icon} from "@nxt-ui/icons";

import {IAccordionComponentProps, IAccordionProps} from "./types";

const AccordionContainer = styled(MuiAccordion)<IAccordionProps>`
    &.accordion-ui {
        .MuiAccordionSummary-root {
            background: var(--b-gblue);
            padding: 15px 8px !important;
            font-family: var(--osc-bold);
            color: var(--dark-drop);
            font-size: calc(var(--fz) + 2px);
            @media (max-width: 768px) {
                padding: 12px 6px !important;
                font-size: calc(var(--fz) - 1px);
            }
        }
        .MuiCollapse-vertical .MuiAccordionDetails-root {
            padding: 20px 0;
            @media (max-width: 768px) {
                padding: 14px 0;
            }
        }
    }
    && {
        width: 100%;
        box-shadow: none;
        background: transparent;
        border: none;

        .MuiAccordionSummary-content {
            margin: 0;
        }
        .MuiAccordionDetails-root {
            padding: 12px 4px;
        }
        .MuiButtonBase-root {
            padding: 0;
            min-height: 0;
            cursor: ${({active}) => (active ? "pointer" : "default")};
            .MuiAccordionSummary-expandIconWrapper {
                margin-right: 1px;
                opacity: ${({active}) => (active ? 1 : 0)};
            }
        }
        .MuiAccordionDetails-root {
            padding: 8px 4px;
        }
        &.Mui-expanded {
            margin: 0;
            min-height: 24px;
            .Mui-expanded {
                margin: 0;
            }
        }
        & {
            padding: 0 0 8px;
        }
        &:before {
            display: none;
        }
    }
`;

export const Accordion: FC<IAccordionComponentProps> = (props) => {
    const {header, active, children, className, ...rest} = props;
    return (
        <AccordionContainer className={className} {...rest} active={active ? 1 : 0}>
            <AccordionSummary className="nxt-ui-accordion" expandIcon={<Icon name="arrow" />}>
                {header}
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </AccordionContainer>
    );
};
