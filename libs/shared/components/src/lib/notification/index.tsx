import { EColors } from '@nxt-ui/colors';
import { Icon } from '@nxt-ui/icons';
import { PaginationComponent } from '../pagination';
import styles from './notification.module.scss';
import { FC } from 'react';
import { INotificationProps } from './types';
import { LogsList } from './tags-list';
import { v4 as uuidv4 } from 'uuid';
import { DropdownComponent } from '../dropdown';

export const Notification: FC<INotificationProps> = (props) => {
    const { logs } = props;

    return (
        <section className={styles['notifications']}>
            <header>
                <h2>Latest notifications</h2>
                <button className={styles['btn-icon']}>
                    <Icon name="sort" style={{ fill: EColors.blue }} />
                </button>
            </header>
            <h3>Date Range</h3>
            <div className={styles['range-holder']}>
                <DropdownComponent
                    style={{ width: 164 }}
                    label="From"
                    values={[1, 2, 3, 4]}
                />
                <DropdownComponent
                    style={{ width: 164 }}
                    label="To"
                    values={[1, 2, 3, 4]}
                />
                <button className={styles['btn-icon']}>
                    <Icon name="search" style={{ fill: EColors.blue }} />
                </button>
            </div>
            <ul className={styles['log-list']}>
                {logs.map((item) => (
                    <LogsList key={uuidv4()} {...item} />
                ))}
            </ul>
            <PaginationComponent count={24} />
        </section>
    );
};
