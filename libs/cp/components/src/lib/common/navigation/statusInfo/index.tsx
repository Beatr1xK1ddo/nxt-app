import {FC, useState, useCallback, useMemo, useRef} from "react";
import {PopperComponent, ButtonIconComponent} from "@nxt-ui/components";
import styled from "@emotion/styled";

const StatusHolder = styled.div`
    border-radius: 50%;
    &:hover {
        background: var(--bluer);
    }
`;

export const StatusInfo: FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const id = useMemo(() => (open ? "status-info" : undefined), [open]);

    const openMenu = useCallback(() => !open && setOpen(true), [open]);

    const closeMenu = useCallback(() => open && setOpen(false), [open]);

    const anchorRef = useRef<HTMLDivElement>(null);

    return (
        <StatusHolder ref={anchorRef} onMouseLeave={closeMenu} onMouseEnter={openMenu}>
            <ButtonIconComponent aria-describedby={id} className="nav-status-holder" />
            <PopperComponent
                className="notification-box"
                style={{minWidth: "8rem"}}
                disablePortal={true}
                placement="bottom"
                id={id}
                open={open}
                anchorEl={anchorRef.current}>
                Lorem ipsum dolor sit amet.
            </PopperComponent>
        </StatusHolder>
    );
};
