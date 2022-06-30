import type {FC} from "react";
import {TxrListFilter, TxrContainer} from "@nxt-ui/cp/components";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";
import { EAppType } from "@nxt-ui/cp/types";

export const TxrListScreen: FC = () => {
    useNodesList(EAppType.TXR);
    useCompaniesList(EAppType.TXR);

    return (
        <>
            <TxrListFilter />
            <TxrContainer />
        </>
    );
};
