import {FC} from "react";
import MuiAccordion, {AccordionProps} from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import {styled} from "@mui/material/styles";
import {Icon} from "@nxt-ui/icons";

import {IAccordionComponentProps} from "./types";

const AccordionContainer: FC<AccordionProps> = styled(MuiAccordion)`
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
        min-height: 0 !important;
        .MuiAccordionSummary-expandIconWrapper {
            margin-right: 1px;
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
`;

export const Accordion: FC<IAccordionComponentProps> = (props) => {
    const {header, children, ...rest} = props;
    return (
        <AccordionContainer {...rest}>
            <AccordionSummary className="nxt-ui-accordion" expandIcon={<Icon name="arrow" />}>
                {header}
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </AccordionContainer>
    );
};
