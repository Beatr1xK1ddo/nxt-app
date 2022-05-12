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

    .MuiAccordionSummary-content {
        margin: 0;
    }
`;

export const Accordion: FC<IAccordionComponentProps> = (props) => {
    const {content, header, style, ...rest} = props;
    return (
        <AccordionContainer {...rest} sx={style}>
            <AccordionSummary className="nxt-ui-accordion" expandIcon={<Icon name="arrow" />}>
                {header}
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
        </AccordionContainer>
    );
};
