import {ReactChild, ReactNode} from "react";
import {AccordionProps} from "@mui/material/Accordion";

export interface IAccordionComponentProps extends AccordionProps {
    header: ReactChild | ReactNode;
    active?: boolean;
}

export interface IAccordionProps extends AccordionProps {
    active?: number;
}
