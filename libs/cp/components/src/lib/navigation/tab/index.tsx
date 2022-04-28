import { Icon } from '@nxt-ui/icons';
import { FC } from 'react';
import { INavigationTabProps } from '../types';
import './nav-tab.css';

export const NavigationTab: FC<INavigationTabProps> = (props) => {
    const { name, menu, children } = props;
    return (
        <li className="nav-tab-wrap">
            <div className="nav-tab">
                {children}
                {name}
                <Icon name="arrow" />
            </div>
            <div className="nav-drop-menu">{menu}</div>
        </li>
    );
};
