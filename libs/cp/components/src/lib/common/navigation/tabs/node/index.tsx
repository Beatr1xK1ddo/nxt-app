import {useCallback, useState} from "react";
import {NavigationTab} from "../../components/tab";
import {TabMenu} from "../../components/tabMenu";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, commonSelectors, ENodeNavAppList, INavAppItemSetPayload} from "@nxt-ui/cp-redux";
import {SimpleTabMenuItem} from "../../components/tabMenuItem/simpleTab";
import "../../index.css";

export const NavNode = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState<boolean>(false);
    const nodeNav = useSelector(commonSelectors.navigation.node);

    const setAppItemHandler = useCallback(
        (value: Omit<INavAppItemSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplicationItem({stateName: "node", ...value}));
        },
        [dispatch]
    );

    const toggleMenuChecks = useCallback(() => setActive((prev) => !prev), []);

    return (
        <NavigationTab name="Node">
            <TabMenu active={active} onClick={toggleMenuChecks}>
                <li>
                    <ul className="nav-simple-wrap">
                        {Object.keys(nodeNav).map((key) => (
                            <SimpleTabMenuItem
                                tab={nodeNav[key as keyof typeof ENodeNavAppList]}
                                onAppItemChange={setAppItemHandler}
                            />
                        ))}
                    </ul>
                </li>
            </TabMenu>
        </NavigationTab>
    );
};
