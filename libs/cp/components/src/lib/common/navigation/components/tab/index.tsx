import {FC, useState, useCallback, useMemo, ReactElement, ReactNode, useRef} from "react";
import {Icon} from "@nxt-ui/icons";
import {PopperComponent} from "@nxt-ui/components";
import "./index.css";

type INavigationTabProps = {
    name?: string;
    icon?: ReactElement | ReactNode;
};

export const NavigationTab: FC<INavigationTabProps> = (props) => {
    const {name, icon, children} = props;

    const [open, setOpen] = useState<boolean>(false);

    const id = useMemo(() => (open ? "menu-top" : undefined), [open]);

    const openMenu = useCallback(() => !open && setOpen(true), [open]);

    const closeMenu = useCallback(() => open && setOpen(false), [open]);

    const anchorRef = useRef<HTMLLIElement>(null);

    return (
        <li className="nav-tab-wrap" ref={anchorRef} onMouseLeave={closeMenu} onMouseEnter={openMenu}>
            <button aria-describedby={id} className="nav-tab">
                {icon}
                {name}
                <Icon name="arrow" />
            </button>
            {children && (
                <PopperComponent
                    disablePortal={true}
                    placement="bottom-start"
                    id={id}
                    open={open}
                    anchorEl={anchorRef.current}>
                    {children}
                </PopperComponent>
            )}
        </li>
    );
};
