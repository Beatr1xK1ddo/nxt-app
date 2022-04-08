import { Icon } from '@nxt-ui/icons';
import { FC } from 'react';
import styles from './grid4.module.scss';
import { Status } from './status';
import { IStatusProps } from './types';

export const Grid4: FC<IStatusProps> = (props) => {
    return (
        <div className={styles['grid4']}>
            <button className={styles['btn-icon']}>
                <Icon name="calendar" />
            </button>
            <Status {...props} />
        </div>
    );
};
