import { FC } from 'react';
import './accordion-title.css';
import { ICardAccordionTitleProps } from '../types';

export const CardAccordionTitle: FC<ICardAccordionTitleProps> = (props) => {
    const { title, paragraph } = props;

    return (
        <div className="card-accordion-title-wrap">
            <h3 className="card-accordion-title">{title}</h3>
            <p className="card-accordion-paragraph">{paragraph}</p>
        </div>
    );
};
