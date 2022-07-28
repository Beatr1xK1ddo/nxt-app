import {FC, useCallback, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {commonSelectors, txrEditActions} from "@nxt-ui/cp-redux";
import {EDataProcessingStatus, INodesListItem} from "@nxt-ui/cp/types";

interface ISelectProxyServerListProps extends IDropdownProps<INodesListItem> {
    onChange?: (e: SelectChangeEvent<unknown>) => void;
    disabled?: boolean;
}

export const SelectProxyServer: FC<ISelectProxyServerListProps> = ({onChange, disabled, ...rest}) => {
    const dispatch = useDispatch();
    const proxyServerList = useSelector(commonSelectors.proxyServer.list);
    const proxyServerListStatus = useSelector(commonSelectors.proxyServer.selectStatus);

    const selectItems = useMemo(() => {
        return proxyServerList.map((item) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <MenuItem key={item.id} value={item}>
                {item.name}
            </MenuItem>
        ));
    }, [proxyServerList]);

    const disabledHandler = useMemo(() => {
        return proxyServerListStatus === EDataProcessingStatus.loading || disabled;
    }, [proxyServerListStatus]);

    const title = useMemo(() => {
        return proxyServerListStatus === EDataProcessingStatus.loading
            ? "Proxy server list are loading ..."
            : "Proxy server";
    }, [proxyServerListStatus]);

    const handleSelect = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            //@ts-ignore
            dispatch(txrEditActions.setProxyServers(e.target.value.id as number));
        },
        [dispatch, txrEditActions]
    );

    return (
        <Dropdown onChange={handleSelect} disabled={disabledHandler} label={title} {...rest}>
            {selectItems}
        </Dropdown>
    );
};
