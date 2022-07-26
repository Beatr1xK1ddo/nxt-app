import React from "react";
import {TooltipComponent} from "@nxt-ui/components";
import {IIpbeListItemDestination, NumericId} from "@nxt-ui/cp/types";

import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";

type Props = {
    proxyServers: Array<{}>;
};

const ProxyStatus = ({proxyServers}: Props) => {
    const hasProxyServers = proxyServers.length > 0;
    return hasProxyServers ? (
        <TooltipComponent
            className="transfer-tooltip"
            arrow={true}
            title={
                <p className="transfer-tooltip-title">
                    PROXY SERVER
                    {proxyServers.map((item) => {
                        return (
                            <>
                                <br />
                                <strong>{item.name}</strong>
                                <br />
                                {item.ip} / {item.port}
                            </>
                        );
                    })}
                </p>
            }
        >
            <div className="proxy-on">proxy ON</div>
        </TooltipComponent>
    ) : (
        <div className="proxy-off">proxy OFF</div>
    );
};

export default ProxyStatus;
