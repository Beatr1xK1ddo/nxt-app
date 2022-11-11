import {useCallback, useState} from "react";
import {NavigationTab} from "../../components/tab";
import {TabMenu} from "../../components/tabMenu";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, commonSelectors, INavAppItemSetPayload, INavAppSetPayload} from "@nxt-ui/cp-redux";
import {TabMenuItem} from "../../components/tabMenuItem/tab";

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

    if (!playoutActive) {
        return null;
    }

    return (
        <NavigationTab name="Playout">
            <TabMenu active={active} onClick={toggleMenuChecks}>
                {Object.keys(playoutNav).map((key) => (
                    <TabMenuItem tab={playoutNav[key]} onAppChage={setAppHandler} onAppItemChange={setAppItemHandler} />
                ))}
            </TabMenu>
        </NavigationTab>
    );
};
