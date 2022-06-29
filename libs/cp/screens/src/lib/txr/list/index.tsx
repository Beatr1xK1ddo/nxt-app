import type {FC} from "react";
import {TxrListFilter, TxrContainer} from "@nxt-ui/cp/components";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";

export const TxrListScreen: FC = () => {
    useNodesList("txr");
    useCompaniesList("txr");

    return (
        <>
            <TxrListFilter />
            <TxrContainer />
        </>
    );
};
