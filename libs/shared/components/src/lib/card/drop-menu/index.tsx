import { FC, useMemo } from 'react';
import styles from './dropmenu.module.scss';
import {Icon} from '@nxt-ui/icons';
import {EColors} from '@nxt-ui/colors';

export const DropMenu: FC = () => {

    const menu = useMemo(() => {
        return [
            'History',
            'Start/Restart',
            'Start/Restart',
            'Stop',
            'Edit',
            'Migrate',
            'Clone',
            'Delete',
            'Add To Monitoring',
        ]
    }, [])



    return (
        <div className={styles['card-menu-holder']}>
            <button className={styles['btn-icon']}>
                <Icon name="properties" style={{fill: EColors.blue}} />
            </button>
            <ul className={styles['card-menu']}>
                {menu.map(item => (
                    <li>{item}</li>
                ))}
            </ul>
        </div>
    );
};
