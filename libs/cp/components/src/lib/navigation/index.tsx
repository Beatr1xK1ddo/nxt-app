import { Icon } from '@nxt-ui/icons';
import styles from './navigation.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { NavigationTab } from './tab';
import { EColors } from '@nxt-ui/colors';
import { FC } from 'react';
import {
    IAppItemBlock,
    INavElemList,
    INavigationProps,
    ITabMenuProps,
} from './types';
import { TabMenu } from './tab-menu';

const tabs: IAppItemBlock = {
    title: {
        value: 'Projects',
        isActive: true,
    },
    items: [
        {
            value: 'Mailing',
        },
        {
            value: 'Ingest',
        },
        {
            value: 'CRM',
        },
    ],
};

const tabs2: IAppItemBlock = {
    title: {
        value: 'Web Player',
        isActive: false,
    },
    items: [
        {
            value: 'Manage Web Players',
        },
        {
            value: 'Create Web Player',
        },
        {
            value: 'Monitoring security cameras',
        },
    ],
};

const testProps: ITabMenuProps['items'] = [tabs, tabs2];

export const Navigation: FC<INavigationProps> = (props) => {
    const { username } = props;

    const navElems: INavElemList = [
        {
            name: 'node',
        },
        {
            name: 'applications',
            menu: <TabMenu items={testProps} />,
        },
        {
            name: 'projects',
        },
        {
            name: 'playout',
        },
        {
            name: 'satellite',
        },
        {
            name: 'monitoring',
        },
    ];

    return (
        <header className={styles['header']}>
            <div className={styles['nav-logo']}>
                <Icon name="logo" />
            </div>
            <nav className={styles['header-nav-holder']}>
                <ul className={styles['header-nav-list']}>
                    {navElems.map((item) => (
                        <NavigationTab
                            key={uuidv4()}
                            name={item.name}
                            menu={item.menu}
                        />
                    ))}
                </ul>
                <div className={styles['icon-holder']}>
                    <Icon name="search" width={24} height={24} />
                </div>
            </nav>
            <div className={styles['nav-right-pannel']}>
                <div className={styles['icon-holder']}>
                    <Icon name="location" />
                </div>
                <div className={styles['icon-holder']}>
                    <Icon name="clock" />
                </div>
                <ul>
                    <NavigationTab name={username}>
                        <span className={styles['nav-status']}></span>
                    </NavigationTab>
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
