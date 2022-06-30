import type {FC} from "react";
import {IpbeActionsStrip, IpbeListFilter, IpbeContainer} from "@nxt-ui/cp/components";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";
import { EAppType } from "@nxt-ui/cp/types";

export const IpbeListScreen: FC = () => {
    useNodesList(EAppType.IPBE);
    useCompaniesList(EAppType.IPBE);

    return (
        <>
            <IpbeListFilter />
            <IpbeActionsStrip />
            <IpbeContainer />
        </>
    );
};
