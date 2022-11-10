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
    const logsNav = useSelector(commonSelectors.navigation.logs);

    const setAppItemHandler = useCallback(
        (value: Omit<INavAppItemSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplicationItem({stateName: "logs", ...value}));
        },
        [dispatch]
    );

    const toggleMenuChecks = useCallback(() => setActive((prev) => !prev), []);

    return (
        <NavigationTab name="Logs">
            <TabMenu active={active} onClick={toggleMenuChecks}>
                <li>
                    <ul className="nav-simple-wrap">
                        {Object.keys(logsNav).map((key) => (
                            <SimpleTabMenuItem
                                tab={logsNav[key as keyof typeof ELogsNavAppList]}
                                onAppItemChange={setAppItemHandler}
                            />
                        ))}
                    </ul>
                </li>
            </TabMenu>
        </NavigationTab>
    );
};
