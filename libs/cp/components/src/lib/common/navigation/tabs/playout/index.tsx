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

export const NavPlayout = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState<boolean>(false);
    const playoutNav = useSelector(commonSelectors.navigation.playout.root);
    const playoutActive = useSelector(commonSelectors.navigation.playout.active);

    const setAppHandler = useCallback(
        (value: Omit<INavAppSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplication({stateName: "playout", ...value}));
        },
        [dispatch]
    );

    const setAppItemHandler = useCallback(
        (value: Omit<INavAppItemSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplicationItem({stateName: "playout", ...value}));
        },
        [dispatch]
    );

    const toggleMenuChecks = useCallback(() => setActive((prev) => !prev), []);

    const groupArr = useMemo(() => {
        const groupArray: Array<Array<INavigationTabState<any>>> = Array.from(Array(2)).map(() => []);

        let mapped = Object.keys(playoutNav)
            .map((key) => playoutNav[key])
            .sort((a, b) => a.id - b.id);
        if (!active) {
            mapped = mapped.filter((item) => item.active);
        }
        mapped.forEach((item) => {
            switch (item.key) {
                case "playout":
                case "playout2":
                    groupArray[0].push(item);
                    break;
                default:
                    groupArray[1].push(item);
                    break;
            }
        });
        return groupArray;
    }, [active, playoutNav]);

    if (!playoutActive) {
        return null;
    }

    return (
        <NavigationTab name="Playout">
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
