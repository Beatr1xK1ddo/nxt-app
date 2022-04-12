import { ReactChild, ReactNode } from 'react';
import { AccordionProps } from '@mui/material/Accordion';

export type IAccordionComponentProps = {
    header: ReactChild | ReactNode;
    content: ReactChild | ReactNode;
    style?: AccordionProps['sx'];
};
