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
    const nodeNav = useSelector(commonSelectors.navigation.node.node);
    const nodeActive = useSelector(commonSelectors.navigation.node.active);

    const setAppItemHandler = useCallback(
        (value: Omit<INavAppItemSetPayload, "stateName">) => {
            dispatch(commonActions.navigationActions.setApplicationItem({stateName: "node", ...value}));
        },
        [dispatch]
    );

    const toggleMenuChecks = useCallback(() => setActive((prev) => !prev), []);

    if (!nodeActive) {
        return null;
    }

    return (
        <NavigationTab name="Node">
            <TabMenu active={active} onClick={toggleMenuChecks}>
                <li>
                    <ul className="nav-simple-wrap">
                        {Object.keys(nodeNav)
                            .map((key) => nodeNav[key as keyof typeof ENodeNavAppList])
                            .sort((a, b) => (a?.id || 0) - (b?.id || 0))
                            .map((item) => (
                                <SimpleTabMenuItem key={item.id} tab={item} onAppItemChange={setAppItemHandler} />
                            ))}
                    </ul>
                </li>
            </TabMenu>
        </NavigationTab>
    );
};
