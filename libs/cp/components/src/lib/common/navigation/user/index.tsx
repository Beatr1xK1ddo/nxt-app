import {FC, useState, useCallback, useMemo, useRef} from "react";
import {Icon} from "@nxt-ui/icons";
import {PopperComponent} from "@nxt-ui/components";
import {useSelector} from "react-redux";
import {commonSelectors} from "@nxt-ui/cp-redux";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";

const UserMenu = styled.ul`
    li {
        margin: 0 0 0.625rem;
        cursor: pointer;
        a {
            color: var(--pale);
            &:hover {
                text-decoration: underline;
            }
        }
        &:last-child {
            margin: 0;
        }
    }
`;

export const NavigationTabUser: FC = () => {
    const user = useSelector(commonSelectors.user.user);

    const [open, setOpen] = useState<boolean>(false);

    const id = useMemo(() => (open ? "menu-top" : undefined), [open]);

    const openMenu = useCallback(() => !open && setOpen(true), [open]);

    const closeMenu = useCallback(() => open && setOpen(false), [open]);

    const anchorRef = useRef<HTMLLIElement>(null);

    const width = useMemo(() => {
        return `${anchorRef?.current?.offsetWidth}px`;
    }, [anchorRef, open]);

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
                <UserMenu>
                    <li>
                        <a href={`${window.location.origin}/profile/edit`}>My profile</a>
                    </li>
                    <li>
                        <a href={`${window.location.origin}/user/list`}>Manage users</a>
                    </li>
                    <li>
                        <a href={`${window.location.origin}/company/list`}>Manage companies</a>
                    </li>
                    <li>
                        <a href={`${window.location.origin}/company/list`}>Manage AP clients</a>
                    </li>
                    <li>
                        <a href={`${window.location.origin}/log/list`}>Log</a>
                    </li>
                    <li>
                        <a href={`${window.location.origin}/log/user/list`}>Login Log</a>
                    </li>
                    <li>
                        <Link to="/notifications">User notifications</Link>
                    </li>
                    <li>
                        <a href={`${window.location.origin}/logout`}>Logout</a>
                    </li>
                </UserMenu>
            </PopperComponent>
        </li>
    );
};
