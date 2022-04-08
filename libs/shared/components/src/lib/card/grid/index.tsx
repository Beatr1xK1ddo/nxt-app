import { FC } from 'react';
import { CheckboxComponent } from '../../checkbox';
import styles from './grid.module.scss';

export const Grid: FC = () => {
    return (
        <div className={styles['grid1']}>
            <div className={styles['checkbox-holder']}>
                <CheckboxComponent />
            </div>
        </div>
    );
};
