import { FC } from 'react';
import styles from './grid5.module.scss';
import { IGrid5Props } from './types';

export const Grid5: FC<IGrid5Props> = (props) => {
    return (
        <div className={styles['grid5']}>
            <div className={styles['inner-grid1']}>2y 32d</div>
            <div className={styles['inner-grid2']}>
                <em>IDX</em>
            </div>
            <div className={styles['inner-grid3']}>
                <em>Format</em>
            </div>
            <div className={styles['inner-grid4']}>6 Mbps</div>
            <div className={styles['inner-grid5']}>08h 41m</div>
            <div className={styles['inner-grid6']}>3</div>
            <div className={styles['inner-grid7']}>1080i59.94</div>
            <div className={styles['inner-grid8']}>128kbps</div>
        </div>
    );
};
