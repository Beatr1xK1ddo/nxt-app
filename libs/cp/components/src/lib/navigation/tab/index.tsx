import { Icon } from '@nxt-ui/icons';
import { FC } from 'react';
import { INavigationTabProps } from '../types';
import styles from './tab.module.scss';

export const NavigationTab: FC<INavigationTabProps> = (props) => {
    const { name, menu, children } = props;
    return (
        <li className={styles['nav-tab-wrap']}>
            <div className={styles['nav-tab']}>
                {children}
                {name}
                <Icon name="arrow" />
            </div>
            <div className={styles['nav-drop-menu']}>{menu}</div>
        </li>
    );
};
