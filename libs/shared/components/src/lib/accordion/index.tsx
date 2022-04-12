import { FC } from 'react';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Icon } from '@nxt-ui/icons';
import { styled } from '@mui/material/styles';
import { IAccordionComponentProps } from './types';

const Root: FC<AccordionProps> = styled(Accordion)`
    width: 100%;
    box-shadow: none;

    .MuiAccordionSummary-content {
        margin: 0;
    }
`;

export const AccordionComponent: FC<IAccordionComponentProps> = (props) => {
    const { content, header, style, ...args } = props;
    return (
        <Root {...args} sx={style}>
            <AccordionSummary
                className="nxt-ui-accordion"
                expandIcon={<Icon name="arrow" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                {header}
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
        </Root>
    );
};
