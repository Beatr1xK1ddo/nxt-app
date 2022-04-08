import { FC } from 'react';
import styles from './grid3.module.scss';
import { IGrid3Props } from './types';

export const Grid3: FC<IGrid3Props> = (props) => {
    const { text } = props;
    return (
        <div className={styles['grid3']}>
            <h2>TimesNow_Zoom_Backup</h2>
            <p>{text}</p>
        </div>
    );
};
