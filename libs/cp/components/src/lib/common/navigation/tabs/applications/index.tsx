import {useCallback, useMemo, useState} from "react";
import {NavigationTab} from "../../components/tab";
import {TabMenu} from "../../components/tabMenu";
import {NavAppIpbe} from "./ipbe/index";
import {NavAppTxr} from "./txr";

export const NavApplication = () => {
    const [active, setActive] = useState<boolean>(false);

    const toggleMenuChecks = useCallback(() => setActive((prev) => !prev), []);

    const menu = useMemo(() => [<NavAppIpbe key="menu-1" />, <NavAppTxr key="menu-2" />], []);

    return (
        <NavigationTab name="Applications">
            <TabMenu active={active} onClick={toggleMenuChecks}>
                {menu}
            </TabMenu>
        </NavigationTab>
    );
};
