import {FC, useCallback, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";

import {Thumbnail} from "@nxt-ui/cp/components";
import {ETXRAppType, ITxrListItem} from "@nxt-ui/cp/types";
import TxrTooltip from "../../txrTooltip";
import ProxyStatus from "../../card/proxyStatus";

import "./index.css";
import {TooltipComponent} from "@nxt-ui/components";

export const AppType = styled("span")`
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin: 0 4px 0 0;
    padding: 2px 12px;
    border-radius: 13px;
    font: 400 calc(var(--fz) - 4px) var(--osc);
    color: var(--blacked);
    line-height: var(--fz) + 2px;
    height: 16px;
    background: var(--caution);
`;

type ICardTableInfoProps = {
    txr: ITxrListItem;
};

export const Caption: FC<ICardTableInfoProps> = ({txr}) => {
    const navigate = useNavigate();

    const {id, name, appType, proxyServersIds, rxNodeId} = useMemo(() => {
        const {id, name, appType, proxyServersIds, rxNodeId} = txr;
        return {id, name, appType, proxyServersIds, rxNodeId};
    }, [txr]);

    const handleTxrNameClick = useCallback(() => {
        navigate(`/txr/${id}`);
    }, [id, navigate]);

    return (
        <div className="table-info-wrap">
            <Thumbnail app={txr} />
            <div className="table-info-left">
                <div className="card-title-holder">
                    <h4 className="card-title" onClick={handleTxrNameClick}>
                        <TooltipComponent className="white-tooltip" arrow={true} title={name}>
                            <span>{name}</span>
                        </TooltipComponent>
                    </h4>
                </div>
                <div className="transfer-info-flags">
                    {appType === ETXRAppType.txr7 ? (
                        <TxrTooltip appType={appType} rxNodeId={rxNodeId} />
                    ) : (
                        <AppType>{appType}</AppType>
                    )}
                    <ProxyStatus proxyServersIds={proxyServersIds} />
                </div>
            </div>
        </div>
    );
};
