import {FC, useState, useCallback, useMemo, useRef} from "react";
import {Icon} from "@nxt-ui/icons";
import {PopperComponent} from "@nxt-ui/components";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, commonSelectors} from "@nxt-ui/cp-redux";

export const NavigationTabUser: FC = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(commonSelectors.user.user);

    const [open, setOpen] = useState<boolean>(false);

    const id = useMemo(() => (open ? "menu-top" : undefined), [open]);

    const openMenu = useCallback(() => !open && setOpen(true), [open]);

    const closeMenu = useCallback(() => open && setOpen(false), [open]);

    const anchorRef = useRef<HTMLLIElement>(null);

    const width = useMemo(() => {
        return `${anchorRef?.current?.offsetWidth}px`;
    }, [anchorRef, open]);

    const logoutUserHandler = useCallback(() => {
        dispatch(commonActions.userActions.logoutUser());
        window.location.assign("https://qa.nextologies.com/login");
    }, [dispatch]);

    return (
        <li className="nav-tab-wrap" ref={anchorRef} onMouseLeave={closeMenu} onMouseEnter={openMenu}>
            <button aria-describedby={id} className="nav-tab">
                <span className="nav-status" />
                {user?.username}
                <Icon name="arrow" />
            </button>
            <PopperComponent
                style={{width}}
                disablePortal={true}
                placement="bottom-end"
                id={id}
                open={open}
                anchorEl={anchorRef.current}>
                <li className="tab-item-user">
                    <a href="https://qa.nextologies.com/profile/edit">My profile</a>
                </li>
                <li className="tab-item-user">
                    <a href="https://qa.nextologies.com/user/list">Manage users</a>
                </li>
                <li className="tab-item-user">
                    <a href="https://qa.nextologies.com/company/list">Manage AP clients</a>
                </li>
                <li className="tab-item-user">
                    <a href="https://qa.nextologies.com/log/list">Log</a>
                </li>
                <li className="tab-item-user">
                    <a href="https://qa.nextologies.com/log/user/list">Login Log</a>
                </li>
                <li className="tab-item-user" onClick={logoutUserHandler}>
                    Logout
                </li>
            </PopperComponent>
        </li>
    );
};
