import {useCallback, useState} from "react";
import {NavigationTab} from "../../components/tab";
import {TabMenu} from "../../components/tabMenu";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, commonSelectors, INavAppItemSetPayload, INavAppSetPayload} from "@nxt-ui/cp-redux";
import {TabMenuItem} from "../../components/tabMenuItem/tab";

export const NavApplication = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState<boolean>(false);
    const applicationNav = useSelector(commonSelectors.navigation.applications.root);
    const applicationActive = useSelector(commonSelectors.navigation.applications.active);

    const setAppHandler = useCallback(
        (value: Omit<INavAppSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplication({stateName: "applications", ...value}));
        },
        [dispatch]
    );

    const setAppItemHandler = useCallback(
        (value: Omit<INavAppItemSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplicationItem({stateName: "applications", ...value}));
        },
        [dispatch]
    );

    const toggleMenuChecks = useCallback(() => setActive((prev) => !prev), []);

    if (!applicationActive) {
        return null;
    }

    return (
        <NavigationTab name="Applications">
            <TabMenu active={active} onClick={toggleMenuChecks}>
                {Object.keys(applicationNav).map((key) => (
                    <TabMenuItem
                        tab={applicationNav[key]}
                        onAppChage={setAppHandler}
                        onAppItemChange={setAppItemHandler}
                    />
                ))}
            </TabMenu>
        </NavigationTab>
    );
};
