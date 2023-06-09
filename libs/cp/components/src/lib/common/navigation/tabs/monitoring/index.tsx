import {useCallback, useState} from "react";
import {NavigationTab} from "../../components/tab";
import {TabMenu} from "../../components/tabMenu";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, commonSelectors, INavAppItemSetPayload, INavAppSetPayload} from "@nxt-ui/cp-redux";
import {TabMenuItem} from "../../components/tabMenuItem/tab";

export const NavMonitoring = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState<boolean>(false);
    const monitoringNav = useSelector(commonSelectors.navigation.monitoring.root);
    const monitoringActive = useSelector(commonSelectors.navigation.monitoring.active);

    const setAppHandler = useCallback(
        (value: Omit<INavAppSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplication({stateName: "monitoring", ...value}));
        },
        [dispatch]
    );

    const setAppItemHandler = useCallback(
        (value: Omit<INavAppItemSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplicationItem({stateName: "monitoring", ...value}));
        },
        [dispatch]
    );

    const toggleMenuChecks = useCallback(() => setActive((prev) => !prev), []);

    if (!monitoringActive) {
        return null;
    }

    const mapped = Object.keys(monitoringNav)
        .map((key) => monitoringNav[key])
        .sort((a, b) => a.id - b.id);

    return (
        <NavigationTab name="Monitoring">
            <TabMenu active={active} onClick={toggleMenuChecks}>
                {mapped.map((item) => (
                    <TabMenuItem
                        active={active}
                        key={item.id}
                        tab={item}
                        onAppChage={setAppHandler}
                        onAppItemChange={setAppItemHandler}
                    />
                ))}
            </TabMenu>
        </NavigationTab>
    );
};
