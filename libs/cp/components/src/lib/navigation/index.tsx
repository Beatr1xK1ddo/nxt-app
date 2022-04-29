import {Icon} from "@nxt-ui/icons";
import {v4 as uuidv4} from "uuid";
import {NavigationTab} from "./tab";
import {FC, useState, useCallback} from "react";
import {IAppItemBlock, INavElemList, INavigationProps, ITabMenuProps} from "./types";
import {TabMenu} from "./tab-menu";

import {PopoverComponent, ButtonIconComponent, InputComponent} from "@nxt-ui/components";
import {useNavigate} from "react-router-dom";
import "./navigation.css";

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
    ],
};

const tabs2: IAppItemBlock = {
    title: {
        value: "Web Player",
        isActive: false,
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

const testProps: ITabMenuProps["items"] = [tabs, tabs2];

export const Navigation: FC<INavigationProps> = (props) => {
    const {username} = props;

    const navElems: INavElemList = [
        {
            name: "node",
        },
        {
            name: "applications",
            menu: <TabMenu items={testProps} />,
        },
        {
            name: "projects",
        },
        {
            name: "playout",
        },
        {
            name: "satellite",
        },
        {
            name: "monitoring",
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
                        <NavigationTab key={uuidv4()} name={item.name} menu={item.menu} />
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
                        <span className="nav-status"></span>
                    </NavigationTab>
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
