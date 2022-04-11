import { Icon } from '@nxt-ui/icons';
import { FC } from 'react';
import styles from './tab.module.scss';
import { INavigationTabProps } from './types';

export const NavigationTab: FC<INavigationTabProps> = (props) => {
    const { name, children } = props;
    return (
        <li className={styles['nav-tab']}>
            {children}
            {name}
            <Icon name='arrow' />
        </li>
    );
}

export default NavigationTab;
