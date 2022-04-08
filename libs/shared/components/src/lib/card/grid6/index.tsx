import { Icon } from '@nxt-ui/icons';
import { FC } from 'react';
import styles from './grid6.module.scss';
import { IGrid6Props } from './types';

export const Grid6: FC<IGrid6Props> = (props) => {
    const { ip } = props;
    return (
        <div className={styles['grid6']}>
            <div className={styles['ip']}>
                <strong>{ip}</strong>
            </div>
            <button className={styles['btn-icon']}>
                <Icon name="plus" />
            </button>
        </div>
    );
};
