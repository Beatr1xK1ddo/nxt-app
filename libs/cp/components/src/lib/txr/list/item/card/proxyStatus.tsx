import {TooltipComponent} from "@nxt-ui/components";
import {useSelector} from "react-redux";
import {commonSelectors} from "@nxt-ui/cp-redux";

type Props = {
    proxyServersIds: Array<number>;
};

const ProxyStatus = ({proxyServersIds}: Props) => {
    const hasProxyServers = proxyServersIds.length > 0;
    const proxyServerEntities = useSelector(commonSelectors.proxyServer.entities);
    return hasProxyServers ? (
        <TooltipComponent
            className="transfer-tooltip"
            arrow={true}
            title={
                <p className="transfer-tooltip-title">
                    PROXY SERVER
                    {proxyServersIds.map((item) => {
                        const proxyServer = proxyServerEntities[item];
                        return (
                            <>
                                <br />
                                <strong>{proxyServer?.name}</strong>
                                <br />
                                {proxyServer?.ip} / {proxyServer?.port}
                            </>
                        );
                    })}
                </p>
            }>
            <div className="proxy-on">proxy ON</div>
        </TooltipComponent>
    ) : (
        <div className="proxy-off">proxy OFF</div>
    );
};

export default ProxyStatus;
