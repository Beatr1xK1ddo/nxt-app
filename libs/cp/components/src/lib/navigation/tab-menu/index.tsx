import { FC } from 'react';
import { ITabMenuProps } from '../types';
import styles from './tab-menu.module.scss';

export const TabMenu: FC<ITabMenuProps> = (props) => {
    const { items } = props;
    return (
        <ul className={styles['tab-menu-container']}>
            {items?.map((item) => (
                <li className={styles['tab-items-container']}>
                    <p className={styles['tab-items-title']}>
                        {item.title.value}
                    </p>
                    <ul className={styles['tab-items-wrap']}>
                        <li className={styles['tab-item']}>
                            <p className={styles['tab-item-title']}>
                                {item.items?.[0].value}
                            </p>
                        </li>
                    </ul>
                </li>
            ))}
        </ul>
    );
};
