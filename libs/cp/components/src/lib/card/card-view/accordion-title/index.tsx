import { FC } from 'react';
import styles from './cardaccordiontitle.module.scss';
import { ICardAccordionTitleProps } from '../types';

export const CardAccordionTitle: FC<ICardAccordionTitleProps> = (props) => {
    const { title, paragraph } = props;

    return (
        <div className={styles['card-accordion-title-wrap']}>
            <h3 className={styles['card-accordion-title']}>{title}</h3>
            <p className={styles['card-accordion-paragraph']}>{paragraph}</p>
        </div>
    );
};
