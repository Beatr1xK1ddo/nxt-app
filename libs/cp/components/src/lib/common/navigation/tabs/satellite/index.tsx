import {useCallback, useState} from "react";
import {NavigationTab} from "../../components/tab";
import {TabMenu} from "../../components/tabMenu";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, commonSelectors, INavAppItemSetPayload, INavAppSetPayload} from "@nxt-ui/cp-redux";
import {TabMenuItem} from "../../components/tabMenuItem/tab";

export const NavSatellite = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState<boolean>(false);
    const satelliteNav = useSelector(commonSelectors.navigation.satellite.root);

    const setAppHandler = useCallback(
        (value: Omit<INavAppSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplication({stateName: "satellite", ...value}));
        },
        [dispatch]
    );

    const setAppItemHandler = useCallback(
        (value: Omit<INavAppItemSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplicationItem({stateName: "satellite", ...value}));
        },
        [dispatch]
    );

    const toggleMenuChecks = useCallback(() => setActive((prev) => !prev), []);

    return (
        <NavigationTab name="Satellite">
            <TabMenu active={active} onClick={toggleMenuChecks}>
                {Object.keys(satelliteNav).map((key) => (
                    <TabMenuItem
                        tab={satelliteNav[key]}
                        onAppChage={setAppHandler}
                        onAppItemChange={setAppItemHandler}
                    />
                ))}
            </TabMenu>
        </NavigationTab>
    );
};
