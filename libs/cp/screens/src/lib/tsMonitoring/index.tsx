import type {FC} from "react";
import {IpbeActionsStrip, IpbeListFilter} from "@nxt-ui/cp/components";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";
import {TsMonitoring} from "@nxt-ui/ts-monitoring/components";

export const TsMonitoringScreen: FC = () => {
    useNodesList("ipbe");
    useCompaniesList("ipbe");

    return (
        <>
            <IpbeListFilter />
            <IpbeActionsStrip />
            <TsMonitoring />
        </>
    );
};
