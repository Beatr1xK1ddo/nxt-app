import React from "react";
import {useSelector} from "react-redux";

import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {AppStatusDisplay} from "@nxt-ui/cp/components";
import {txrEditSelectors} from "@nxt-ui/cp-redux";

const ApplicationStatus = () => {
    const nodeId = useSelector(txrEditSelectors.main.node);
    const txr = useSelector(txrEditSelectors.selectBasicApplication);
    const {status} = useRealtimeAppData(nodeId, "txr2", txr.id, txr.startedAtMs);

    return <AppStatusDisplay status={status} />;
};

export default ApplicationStatus;
