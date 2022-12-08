import {Icon} from "@nxt-ui/icons";
import {FC, useState, useCallback, ChangeEventHandler, useRef} from "react";
import {PopoverComponent, ButtonIconComponent, InputComponent} from "@nxt-ui/components";
import {NavApplication} from "./tabs/applications";
import {NavNode} from "./tabs/node";
import {NavProjects} from "./tabs/projects";
import {NavPlayout} from "./tabs/playout";
import "./index.css";
import {NavSatellite} from "./tabs/satellite";
import {NavLogs} from "./tabs/logs";
import {NavMonitoring} from "./tabs/monitoring";
import {NavigationTabUser} from "./user";
import {NotificationBox} from "../notification";
import {useClickOutside, useUserNotifications} from "@nxt-ui/cp/hooks";

export const Navigation: FC = () => {
    const {data: notifications} = useUserNotifications();
    const notificationMenuRef = useRef<HTMLDivElement | null>(null);
    const [showNotificationBox, setShowNotificationBox] = useState(false);
    useClickOutside(notificationMenuRef, () => setShowNotificationBox(false));
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [search, setSearch] = useState<string>("");
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "main-search-popover" : undefined;

    const navigateHome = useCallback(() => window.location.replace("https://qa.nextologies.com/"), []);
    const searchHandler = useCallback(
        () => window.location.replace(`https://qa.nextologies.com/search-in-davinci?name=${search}`),
        [search]
    );
    const setSearchHandler = useCallback(
        (e) => setSearch(e.currentTarget.value),
        []
    ) as ChangeEventHandler<HTMLInputElement>;

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
                        <InputComponent onChange={setSearchHandler} value={search} placeholder="Search query" />
                        <ButtonIconComponent onClick={searchHandler}>
                            <Icon name="search" />
                        </ButtonIconComponent>
                    </PopoverComponent>
                </div>
            </nav>
            <div className="nav-right-pannel">
                <div className="icon-holder">
                    <Icon name="location" />
                </div>
                <div className="icon-holder" ref={notificationMenuRef}>
                    <div
                        className={`iconNotification ${!!notifications?.length && "active"}`}
                        onClick={() => setShowNotificationBox(!showNotificationBox)}>
                        <Icon name="notification" />
                    </div>
                    <NotificationBox
                        heading="Latest notifications"
                        className="notificationWindow"
                        show={showNotificationBox}
                        notifications={notifications}
                    />
                </div>
                <div className="icon-holder">
                    <Icon name="clock" />
                </div>
                <ul>
                    <NavigationTabUser />
                </ul>
            </div>
        </header>
    );
};

export default Navigation;
