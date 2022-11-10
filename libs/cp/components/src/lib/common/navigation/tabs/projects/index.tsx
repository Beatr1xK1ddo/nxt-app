import {useCallback, useState} from "react";
import {NavigationTab} from "../../components/tab";
import {TabMenu} from "../../components/tabMenu";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, commonSelectors, INavAppItemSetPayload, INavAppSetPayload} from "@nxt-ui/cp-redux";
import {TabMenuItem} from "../../components/tabMenuItem/tab";

export const NavProjects = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState<boolean>(false);
    const projectsNav = useSelector(commonSelectors.navigation.projects.root);

    const setAppHandler = useCallback(
        (value: Omit<INavAppSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplication({stateName: "projects", ...value}));
        },
        [dispatch]
    );

    const setAppItemHandler = useCallback(
        (value: Omit<INavAppItemSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplicationItem({stateName: "projects", ...value}));
        },
        [dispatch]
    );

    const toggleMenuChecks = useCallback(() => setActive((prev) => !prev), []);

    return (
        <NavigationTab name="Projects">
            <TabMenu active={active} onClick={toggleMenuChecks}>
                {Object.keys(projectsNav).map((key) => (
                    <TabMenuItem
                        tab={projectsNav[key]}
                        onAppChage={setAppHandler}
                        onAppItemChange={setAppItemHandler}
                    />
                ))}
            </TabMenu>
        </NavigationTab>
    );
};
