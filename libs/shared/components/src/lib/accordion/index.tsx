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
