import React from "react";
import {useSelector} from "react-redux";

import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {AppStatus} from "@nxt-ui/cp/components";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";

const ApplicationStatus = () => {
    const nodeId = useSelector(ipbeEditSelectors.main.node);
    const ipbe = useSelector(ipbeEditSelectors.selectBasicApplication);
    const {status} = useRealtimeAppData(nodeId, "ipbe2", ipbe.id, ipbe.startedAtMs);

    return <AppStatus status={status} />;
};

export default ApplicationStatus;
