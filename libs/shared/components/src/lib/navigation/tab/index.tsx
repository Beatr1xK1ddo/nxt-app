import { FC } from 'react';
import { Icon } from '@nxt-ui/icons';
import styles from './tab.module.scss';
import { INavTab } from './types';

export const NavTab: FC<INavTab> = (props) => {
    const { label } = props;

    return (
        <li className={styles['menu-link']}>
            {label}
            <span className={styles['btn-icon']}>
                <Icon
                    name="arrow"
                    style={{
                        transform: 'rotateX(180deg)',
                        width: 12,
                        height: 12,
                    }}
                />
            </span>
        </li>
    );
};
