import {Icon} from "@nxt-ui/icons";
import {FC, useState, useCallback} from "react";
import {INavigationProps} from "./types";
import {PopoverComponent, ButtonIconComponent, InputComponent} from "@nxt-ui/components";
import {NavigationTab} from "./components/tab";
import {NavApplication} from "./tabs/applications";
import {NavNode} from "./tabs/node";
import {NavProjects} from "./tabs/projects";
import {NavPlayout} from "./tabs/playout";
import "./index.css";
import {NavSatellite} from "./tabs/satellite";
import {NavLogs} from "./tabs/logs";
import {NavMonitoring} from "./tabs/monitoring";

export const Navigation: FC<INavigationProps> = (props) => {
    const {username} = props;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "main-search-popover" : undefined;

    const navigateHome = useCallback(() => window.location.replace("https://qa.nextologies.com/"), []);

    return (
        <header className="header">
            <div className="nav-logo" onClick={navigateHome}>
                <Icon name="logo" />
            </div>
            <nav className="header-nav-holder">
                <ul className="header-nav-list">
                    <NavNode />
                    <NavApplication />
                    <NavProjects />
                    <NavPlayout />
                    <NavSatellite />
                    <NavMonitoring />
                    <NavLogs />
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
                    <NavigationTab name={username} icon={<span className="nav-status" />} />
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
