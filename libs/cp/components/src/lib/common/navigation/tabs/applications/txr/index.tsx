import {commonActions, commonSelectors} from "@nxt-ui/cp-redux";
import {useMemo, useCallback, FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TabMenuItem} from "../../../components/tabMenuItem";
import {ETxrNavAppList} from "@nxt-ui/cp/types";

type INavAppTxrProps = {
    active?: boolean;
};

export const NavAppTxr: FC<INavAppTxrProps> = ({active}) => {
    const {manageTxr, createTxr} = useSelector(commonSelectors.navigation.txrNavTabs);
    const txrActive = useSelector(commonSelectors.navigation.txrActive);

    const {name, key} = useSelector(commonSelectors.navigation.txrName);

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
                key: "manageTxr",
                value: ETxrNavAppList.manageTxr,
                path: "/txrs",
                active: manageTxr,
            },
            {
                key: "createTxr",
                value: ETxrNavAppList.createTxr,
                path: "/txr",
                active: createTxr,
            },
        ],
        [manageTxr, createTxr]
    );
    return (
        <TabMenuItem
            onAppChage={setAppHandler}
            onAppItemChange={setAppItemHandler}
            active={txrActive}
            items={tabUrls}
            keyName={key}
            name={name}
        />
    );
};
