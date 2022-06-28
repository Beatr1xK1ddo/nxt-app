import type {FC} from "react";
import {IpbeActionsStrip, IpbeListFilter, IpbeContainer} from "@nxt-ui/cp/components";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";

export const IpbeListScreen: FC = () => {
    useNodesList("ipbe");
    useCompaniesList("ipbe");

    return (
        <>
            <IpbeListFilter />
            <IpbeActionsStrip />
            <IpbeContainer />
        </>
    );
};
