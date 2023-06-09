import {useCallback, useState} from "react";
import {NavigationTab} from "../../components/tab";
import {TabMenu} from "../../components/tabMenu";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, commonSelectors, ELogsNavAppList, INavAppItemSetPayload} from "@nxt-ui/cp-redux";
import {SimpleTabMenuItem} from "../../components/tabMenuItem/simpleTab";
import "../../index.css";

export const NavLogs = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState<boolean>(false);
    const logsNav = useSelector(commonSelectors.navigation.logs.logs);
    const logsActive = useSelector(commonSelectors.navigation.logs.active);

    const setAppItemHandler = useCallback(
        (value: Omit<INavAppItemSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplicationItem({stateName: "logs", ...value}));
        },
        [dispatch]
    );

    const toggleMenuChecks = useCallback(() => setActive((prev) => !prev), []);

    if (!logsActive) {
        return null;
    }

    return (
        <NavigationTab name="Logs">
            <TabMenu active={active} onClick={toggleMenuChecks}>
                <li>
                    <ul className="nav-simple-wrap">
                        {Object.keys(logsNav)
                            .map((key) => logsNav[key as keyof typeof ELogsNavAppList])
                            .sort((a, b) => (a?.id || 0) - (b?.id || 0))
                            .map((item) => (
                                <SimpleTabMenuItem
                                    active={active}
                                    key={item.id}
                                    tab={item}
                                    onAppItemChange={setAppItemHandler}
                                />
                            ))}
                    </ul>
                </li>
            </TabMenu>
        </NavigationTab>
    );
};
