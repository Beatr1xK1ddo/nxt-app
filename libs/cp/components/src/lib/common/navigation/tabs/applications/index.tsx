import {useCallback, useMemo, useState} from "react";
import {NavigationTab} from "../../components/tab";
import {TabMenu} from "../../components/tabMenu";
import {NavAppIpbe} from "./ipbe/index";
import {NavAppTxr} from "./txr";

export const NavApplication = () => {
    const [active, setActive] = useState<boolean>(false);

    const toggleMenuChecks = useCallback(() => setActive((prev) => !prev), []);

    const menu = useMemo(() => [<NavAppIpbe />, <NavAppTxr />], []);

    return (
        <NavigationTab name="Applications">
            <TabMenu active={active} onClick={toggleMenuChecks}>
                {menu}
            </TabMenu>
        </NavigationTab>
    );
};
