import {useSelector} from "react-redux";

import {useRealtimeAppData, useStatusChangeNotification} from "@nxt-ui/cp/hooks";
import {AppStatusDisplay} from "@nxt-ui/cp/components";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";

const ApplicationStatus = () => {
    const nodeId = useSelector(ipbeEditSelectors.main.node);
    const ipbe = useSelector(ipbeEditSelectors.selectBasicApplication);
    const name = useSelector(ipbeEditSelectors.main.name);

    const {status} = useRealtimeAppData(nodeId, "ipbe2", ipbe.id, ipbe.startedAtMs);

    const {currentStatus} = useStatusChangeNotification(name, ipbe.status, status);

    return <AppStatusDisplay status={currentStatus} />;
};

export default ApplicationStatus;
