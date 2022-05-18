import type {FC} from "react";
import {IpbeActionsStrip, IpbeListFilter, IpbeItems} from "@nxt-ui/cp/components";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";

export const IpbeScreen: FC = () => {
    useNodesList("ipbe");
    useCompaniesList("ipbe");

    return (
        <>
            <IpbeListFilter />
            <IpbeActionsStrip />
            <IpbeItems />
        </>
    );
};
