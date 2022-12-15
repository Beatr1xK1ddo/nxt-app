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
export const NavProjects = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState<boolean>(false);
    const projectsNav = useSelector(commonSelectors.navigation.projects.root);
    const projectsActive = useSelector(commonSelectors.navigation.projects.active);

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

    const groupArr = useMemo(() => {
        const groupArray: Array<Array<INavigationTabState<any>>> = Array.from(Array(4)).map(() => []);

        let mapped = Object.keys(projectsNav)
            .map((key) => projectsNav[key])
            .sort((a, b) => a.id - b.id);
        if (!active) {
            mapped = mapped.filter((item) => item.active);
        }
        mapped.forEach((item) => {
            switch (item.key) {
                case "projects":
                case "webPlayer":
                    groupArray[0].push(item);
                    break;
                case "apOccasionalUse":
                case "ap":
                case "apTests":
                    groupArray[1].push(item);
                    break;
                case "raspberry":
                case "mags":
                case "commercialDetection":
                case "exportWebStream":
                    groupArray[2].push(item);
                    break;
                default:
                    groupArray[3].push(item);
                    break;
            }
        });
        return groupArray;
    }, [active, projectsNav]);

    if (!projectsActive) {
        return null;
    }
    return (
        <NavigationTab name="Projects">
            <TabMenu active={active} onClick={toggleMenuChecks} className="custom-container">
                {groupArr.map((arr, index) => {
                    return (
                        <div key={index} className="nav-item-row-wrap">
                            {arr.map((item) => (
                                <TabMenuItem
                                    active={active}
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
