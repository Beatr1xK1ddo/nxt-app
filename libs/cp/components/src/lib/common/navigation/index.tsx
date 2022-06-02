import {Icon} from "@nxt-ui/icons";
import {NavigationTab} from "./tab";
import {FC, useState, useCallback} from "react";
import {IAppItemBlock, INavElemList, INavigationProps, ITabMenuProps} from "./types";
import {TabMenu} from "./tabMenu";

import {PopoverComponent, ButtonIconComponent, InputComponent} from "@nxt-ui/components";
import {useNavigate} from "react-router-dom";
import "./index.css";

const tabs: IAppItemBlock = {
    title: {
        value: "Projects",
        isActive: true,
    },
    items: [
        {
            value: "Mailing",
        },
        {
            value: "Ingest",
        },
        {
            value: "CRM",
        },
        {
            value: "CRM2",
        },
        {
            value: "CRM3",
        },
    ],
};

const tabs2: IAppItemBlock = {
    title: {
        value: "Web Player",
        isActive: true,
    },
    items: [
        {
            value: "Manage Web Players",
        },
        {
            value: "Create Web Player",
        },
        {
            value: "Monitoring security cameras",
        },
    ],
};

const testProps: ITabMenuProps["items"] = [tabs, tabs2, tabs, tabs2, tabs, tabs2, tabs2, tabs, tabs2, tabs2, tabs2];
const testProps2: ITabMenuProps["items"] = [tabs];
const testProps3: ITabMenuProps["items"] = [tabs, tabs, tabs2];

export const Navigation: FC<INavigationProps> = (props) => {
    const {username} = props;

    const navElems: INavElemList = [
        {
            name: "node",
            menu: <TabMenu items={testProps2} />,
        },
        {
            name: "applications",
            menu: <TabMenu items={testProps} />,
        },
        {
            name: "projects",
            menu: <TabMenu items={testProps3} />,
        },
        {
            name: "playout",
            menu: <TabMenu items={testProps} />,
        },
        {
            name: "satellite",
            menu: <TabMenu items={testProps2} />,
        },
        {
            name: "monitoring",
            menu: <TabMenu items={testProps} />,
        },
    ];

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "main-search-popover" : undefined;

    const navigate = useNavigate();

    const navigateHome = useCallback(() => navigate("/"), [navigate]);

    return (
        <header className="header">
            <div className="nav-logo" onClick={navigateHome}>
                <Icon name="logo" />
            </div>
            <nav className="header-nav-holder">
                <ul className="header-nav-list">
                    {navElems.map((item) => (
                        <NavigationTab key={item.name} name={item.name} menu={item.menu} />
                    ))}
                </ul>
                <div className="icon-holder">
                    <ButtonIconComponent aria-describedby={id} onClick={handleClick}>
                        <Icon name="search" />
                    </ButtonIconComponent>
                    <PopoverComponent
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}>
                        <InputComponent placeholder="Search query" />
                        <ButtonIconComponent>
                            <Icon name="search" />
                        </ButtonIconComponent>
                    </PopoverComponent>
                </div>
            </nav>
            <div className="nav-right-pannel">
                <div className="icon-holder">
                    <Icon name="location" />
                </div>
                <div className="icon-holder">
                    <Icon name="clock" />
                </div>
                <ul>
                    <NavigationTab name={username}>
                        <span className="nav-status" />
                    </NavigationTab>
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
