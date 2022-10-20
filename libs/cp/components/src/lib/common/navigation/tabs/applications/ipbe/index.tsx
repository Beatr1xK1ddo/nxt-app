import {EIpbeNavAppList} from "@nxt-ui/cp/types";
import {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, commonSelectors} from "@nxt-ui/cp-redux";
import {TabMenuItem} from "../../../components/tabMenuItem";

export const NavAppIpbe = () => {
    const {manageIpbe, createIpbe} = useSelector(commonSelectors.navigation.ipbeNavTabs);
    const {name, key} = useSelector(commonSelectors.navigation.ipbeName);
    const ipbeActive = useSelector(commonSelectors.navigation.ipbeActive);

    const dispatch = useDispatch();

    const setAppHandler = useCallback(
        (value: string) => {
            dispatch(commonActions.navigationActions.setApplication(value));
        },
        [dispatch]
    );

    const setAppItemHandler = useCallback(
        (value: string) => {
            dispatch(commonActions.navigationActions.setApplicationItem(value));
        },
        [dispatch]
    );

    const tabUrls = useMemo(
        () => [
            {
                key: "manageIpbe",
                value: EIpbeNavAppList.manageIpbe,
                path: "/ipbes",
                active: manageIpbe,
            },
            {
                key: "createIpbe",
                value: EIpbeNavAppList.createIpbe,
                path: "/ipbe",
                active: createIpbe,
            },
        ],
        [manageIpbe, createIpbe]
    );
    return (
        <TabMenuItem
            active={ipbeActive}
            onAppItemChange={setAppItemHandler}
            keyName={key}
            onAppChage={setAppHandler}
            name={name}
            items={tabUrls}
        />
    );
};
