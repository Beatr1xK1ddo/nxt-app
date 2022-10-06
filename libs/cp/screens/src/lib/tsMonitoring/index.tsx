import type {FC} from "react";
import {IpbeListFilter} from "@nxt-ui/cp/components";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";
import {TsMonitoring} from "@nxt-ui/ts-monitoring/components";
import {EAppType} from "@nxt-ui/cp/types";

export const TsMonitoringScreen: FC = () => {
    useNodesList(EAppType.IPBE);
    useCompaniesList(EAppType.IPBE);

    return (
        <>
            <IpbeListFilter />
            {/* <IpbeActionsStrip /> */}
            <TsMonitoring />
        </>
    );
};
