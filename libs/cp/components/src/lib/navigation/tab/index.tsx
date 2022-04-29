import { Icon } from '@nxt-ui/icons';
import { FC, useState, SyntheticEvent } from 'react';
import { INavigationTabProps } from '../types';
import './nav-tab.css';

export const NavigationTab: FC<INavigationTabProps> = (props) => {
    const { name, menu, children } = props;

    // const [isActive, setActive] = useState(false);
    // const toggleActive = (e: SyntheticEvent): void => {
    //     console.log(e.target);

    //     setActive(!isActive);
    // };

    return (
        <li
            // onClick={toggleActive}
            // className={`nav-tab-wrap ${isActive ? 'active-nav-tab' : ''} `}
            className="nav-tab-wrap"
        >
            <button className="nav-tab">
                {children}
                {name}
                <Icon name="arrow" />
            </button>
            <div className="nav-drop-menu">{menu}</div>
        </li>
    );
};
