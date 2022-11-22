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

    const groupArr = useMemo(() => {
        const groupArray: Array<Array<INavigationTabState<any>>> = Array.from(Array(4)).map(() => []);

        let mapped = Object.keys(applicationNav)
            .map((key) => applicationNav[key])
            .sort((a, b) => a.id - b.id);
        if (!active) {
            mapped = mapped.filter((item) => item.active);
        }
        mapped.forEach((item) => {
            switch (item.key) {
                case "channel":
                case "transcoder":
                case "transcoder2":
                case "standardsConversion":
                case "slateGenerator":
                    groupArray[0].push(item);
                    break;
                case "srt":
                case "spts":
                case "mpts":
                case "supervisor":
                case "teranex":
                    groupArray[1].push(item);
                    break;
                case "ipbe":
                case "timeshifting":
                case "failover":
                case "tsForward":
                case "multiscreen":
                case "qFrame":
                    groupArray[2].push(item);
                    break;
                default:
                    groupArray[3].push(item);
                    break;
            }
        });
        return groupArray;
    }, [active, applicationNav]);

    if (!applicationActive) {
        return null;
    }

    return (
        <NavigationTab name="Applications">
            <TabMenu active={active} onClick={toggleMenuChecks} className="custom-container">
                {groupArr.map((arr) => {
                    return (
                        <div className="nav-item-row-wrap">
                            {arr.map((item) => (
                                <TabMenuItem
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
