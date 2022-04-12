import { FC, useMemo } from 'react';
import styles from './tableinfo.module.scss';
import { ICardTableInfoProps } from './types';

export const CardTableInfo: FC<ICardTableInfoProps> = (props) => {
    const { text, title, image } = props;

    const imageCss = useMemo(
        () => ({
            backgroundImage: `url(${image})`,
        }),
        [image]
    );

    return (
        <div className={styles['table-info-wrap']}>
            <div className={styles['card-img']} style={imageCss}></div>
            <div className={styles['table-info-left']}>
                <h4 className={styles['card-title']}>{title}</h4>
                <p className={styles['card-text']}>{text}</p>
            </div>
        </div>
    );
};
