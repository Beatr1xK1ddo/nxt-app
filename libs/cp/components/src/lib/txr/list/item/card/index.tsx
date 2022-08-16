import {FC, useCallback, useMemo, useRef, useState} from "react";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styled from "@emotion/styled";

import {Icon} from "@nxt-ui/icons";
import {
    Accordion,
    Button,
    CheckboxComponent,
    CircularProgressWithLabel,
    MenuComponent,
    MenuItemStyled,
    TooltipComponent,
} from "@nxt-ui/components";
import {EAppType, ETXRAppType, ITxrListItem} from "@nxt-ui/cp/types";
import {commonActions, txrListActions, txrListSelectors} from "@nxt-ui/cp-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {
    AppStatusDisplay,
    CardAccordionHeader,
    FlexHolder,
    NxtDatePicker,
    PerformanceChart,
    ServerLoginTooltip,
    Thumbnail,
} from "@nxt-ui/cp/components";

import {TxrNodeName} from "../../../nodeName";
import TxrTooltip from "../txrTooltip";
import ProxyStatus from "./proxyStatus";

import "./index.css";

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

interface TxrCardItemProps {
    txr: ITxrListItem;
}

export const TxrCardItem: FC<TxrCardItemProps> = ({txr}) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const {
        name,
        appType,
        sourceIp,
        outputIp,
        txNodeId,
        rxNodeId,
        sourcePort,
        outputPort,
        proxyServersIds,
        rxRunMonitor,
        endpoint,
    } = txr;

    // Chart data
    const {status: rxStatus} = useRealtimeAppData(txr, rxNodeId);
    const {status: txStatus} = useRealtimeAppData(txr, txNodeId);
    const destinations = useMemo(() => {
        return {outputIp, outputPort};
    }, [outputIp, outputPort]);

    const handleDeleteTxr = useCallback(() => {
        dispatch(
            commonActions.applicationActions.removeApplications({data: {id: txr.id, name}, appType: EAppType.TXR})
        );
    }, [txr.id, dispatch, name]);

    const handleEditTxr = useCallback(() => {
        setMenuOpen(false);
        navigate(`/txr/${txr.id}`);
    }, [txr.id, navigate]);

    const btnRef = useRef<HTMLDivElement | null>(null);

    const handleMenuOpen = useCallback(() => {
        setMenuOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
        setMenuOpen(false);
    }, []);

    const selected = useSelector(txrListSelectors.selectTxrListSelected);
    const handleSelection = useCallback(() => {
        const exist = selected.includes(txr.id);
        if (exist) {
            dispatch(txrListActions.removeSelected(txr.id));
        } else {
            dispatch(txrListActions.setSelected(txr.id));
        }
    }, [selected, dispatch, txr.id]);

    return (
        <div className="card-wrap">
            <section className="card-holder">
                <div className="checkbox-holder">
                    <CheckboxComponent onClick={handleSelection} checked={selected.includes(txr.id)} />
                </div>

                <div className="card-content">
                    <h4 className="card-title" onClick={handleEditTxr}>
                        {endpoint && <Icon name="allocation" />} <span>{name}</span>
                    </h4>
                    <div className="transfer-info-flags">
                        {appType === ETXRAppType.txr7 ? (
                            <TxrTooltip appType={appType} rxNodeId={rxNodeId} />
                        ) : (
                            <AppType>{appType}</AppType>
                        )}
                        <ProxyStatus proxyServersIds={proxyServersIds} />
                    </div>

                    <Accordion header={<CardAccordionHeader title={"Info"} paragraph={""} />} defaultExpanded>
                        <div className="info-block">
                            <ul className="card-transfer-block">
                                <li>
                                    <span className="text-thin">
                                        {sourceIp}:{sourcePort}
                                    </span>
                                    <br />
                                    <TooltipComponent
                                        className="white-tooltip"
                                        arrow={true}
                                        title={<ServerLoginTooltip nodeId={txNodeId} />}>
                                        <span className="text-small">
                                            {txNodeId && <TxrNodeName node={"tx"} app={txr} />}
                                        </span>
                                    </TooltipComponent>
                                </li>
                                <li>&rarr;</li>
                                <li>
                                    <span className="text-thin">
                                        {outputIp}:{outputPort}
                                    </span>
                                    <br />
                                    <TooltipComponent
                                        className="white-tooltip"
                                        arrow={true}
                                        title={<ServerLoginTooltip nodeId={rxNodeId} />}>
                                        <span className="text-small">
                                            {rxNodeId && <TxrNodeName node={"rx"} app={txr} />}
                                        </span>
                                    </TooltipComponent>
                                </li>
                            </ul>

                            <FlexHolder justify="flex-start" className="card-info">
                                <Thumbnail type="txr" id={txr.id} />
                                <CircularProgressWithLabel value={80} />
                                <AppStatusDisplay app={txr} nodeId={txr.rxNodeId} />
                                {txNodeId && <NxtDatePicker nodeId={txNodeId} />}
                            </FlexHolder>
                        </div>
                    </Accordion>
                    <PerformanceChart
                        status={rxStatus}
                        monitor={rxRunMonitor}
                        nodeId={rxNodeId}
                        destination={destinations}
                    />
                    <PerformanceChart
                        status={txStatus}
                        monitor={rxRunMonitor}
                        nodeId={txNodeId}
                        destination={destinations}
                    />
                    <Accordion
                        header={
                            <CardAccordionHeader
                                title={"Media view"}
                                paragraph={format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}
                            />
                        }>
                        <Thumbnail type="ipbe" id={txr.id} />
                    </Accordion>
                </div>
            </section>
            <ul className="card-icon-list">
                <li>
                    <Button data-type="btn-icon">
                        <Icon name="pause" />
                    </Button>
                </li>
                <li>
                    <Button data-type="btn-icon" onClick={handleEditTxr}>
                        <Icon name="edit" />
                    </Button>
                </li>
                <li>
                    <Button data-type="btn-icon">
                        <Icon name="move" />
                    </Button>
                </li>
                <li>
                    <Button data-type="btn-icon">
                        <Icon name="copy" />
                    </Button>
                </li>
                <li>
                    <Button data-type="btn-icon">
                        <Icon name="flag" />
                    </Button>
                </li>
                <li>
                    <MenuComponent anchorEl={btnRef.current} open={menuOpen} onClose={handleMenuClose}>
                        <MenuItemStyled onClick={handleEditTxr}>Edit</MenuItemStyled>
                        <MenuItemStyled onClick={handleDeleteTxr}>Delete</MenuItemStyled>
                    </MenuComponent>
                    <Button data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
                        <Icon name="properties" />
                    </Button>
                </li>
            </ul>
        </div>
    );
};
