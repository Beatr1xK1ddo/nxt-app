import {useCallback, useMemo, useState} from "react";
import {NavigationTab} from "../../components/tab";
import {TabMenu} from "../../components/tabMenu";
import {useDispatch, useSelector} from "react-redux";
import {
    commonActions,
    commonSelectors,
    INavAppItemSetPayload,
    INavAppSetPayload,
    INavigationTabState,
} from "@nxt-ui/cp-redux";
import {TabMenuItem} from "../../components/tabMenuItem/tab";
import "../../index.css";

export const NavSatellite = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState<boolean>(false);
    const satelliteNav = useSelector(commonSelectors.navigation.satellite.root);
    const satelliteActive = useSelector(commonSelectors.navigation.satellite.active);

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

    const groupArr = useMemo(() => {
        const groupArray: Array<Array<INavigationTabState<any>>> = Array.from(Array(2)).map(() => []);

        let mapped = Object.keys(satelliteNav)
            .map((key) => satelliteNav[key])
            .sort((a, b) => a.id - b.id);
        if (!active) {
            mapped = mapped.filter((item) => item.active);
        }
        mapped.forEach((item) => {
            switch (item.key) {
                case "satellite":
                case "terrestrial":
                case "mcr":
                case "gsr":
                    groupArray[0].push(item);
                    break;
                default:
                    groupArray[1].push(item);
                    break;
            }
        });
        return groupArray;
    }, [active, satelliteNav]);

    if (!satelliteActive) {
        return null;
    }

    return (
        <NavigationTab name="Satellite">
            <TabMenu active={active} onClick={toggleMenuChecks} className="custom-container">
                {groupArr.map((arr, index) => {
                    return (
                        <div key={index} className="nav-item-row-wrap">
                            {arr.map((item) => (
                                <TabMenuItem
                                    key={item.id}
                                    tab={item}
                                    onAppChage={setAppHandler}
                                    onAppItemChange={setAppItemHandler}
                                />
                            ))}
                        </div>
                    );
                })}
            </TabMenu>
        </NavigationTab>
    );
};
