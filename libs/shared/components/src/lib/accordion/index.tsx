import {FC} from "react";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import {styled} from "@mui/material/styles";
import {Icon} from "@nxt-ui/icons";

import {IAccordionComponentProps, IAccordionProps} from "./types";

const AccordionContainer = styled(MuiAccordion)<IAccordionProps>`
    && {
        width: 100%;
        box-shadow: none;
        background: transparent;
        border: none;

        .MuiAccordionSummary-content {
            margin: 0;
        }
        .MuiAccordionDetails-root {
            padding: 0.75rem 0.25rem;
        }
        .MuiButtonBase-root {
            padding: 0;
            min-height: 0;
            cursor: ${({active}) => (active ? "pointer" : "default")};
            .MuiAccordionSummary-expandIconWrapper {
                margin-right: 0.0625rem;
                opacity: ${({active}) => (active ? 1 : 0)};
            }
        }
        .MuiAccordionDetails-root {
            padding: 0.5rem 0.25rem;
        }
        &.Mui-expanded {
            margin: 0;
            min-height: 1.5rem;
            .Mui-expanded {
                margin: 0;
            }
        }
        & {
            padding: 0 0 0.5rem;
        }
        &:before {
            display: none;
        }
    }
`;

export const Accordion: FC<IAccordionComponentProps> = (props) => {
    const {header, active, children, ...rest} = props;
    return (
        <AccordionContainer {...rest} active={active ? 1 : 0}>
            <AccordionSummary className="nxt-ui-accordion" expandIcon={<Icon name="arrow" />}>
                {header}
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </AccordionContainer>
    );
};
