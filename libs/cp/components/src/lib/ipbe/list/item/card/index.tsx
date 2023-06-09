import {FC, useCallback, useMemo, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import clsx from "clsx";

import {Icon} from "@nxt-ui/icons";
import {
    Accordion,
    Button,
    CheckboxComponent,
    CircularProgressWithLabel,
    ModalComponent,
    TooltipComponent,
} from "@nxt-ui/components";
import {EApiAppType, EAppGeneralStatus, EAppType, IIpbeListItem} from "@nxt-ui/cp/types";
import {commonActions, commonSelectors} from "@nxt-ui/cp-redux";
import {
    AppRuntimeDisplay,
    AppStatusButton,
    AppRestartButton,
    AppStatusDisplay,
    CardAccordionHeader,
    EditApplication,
    FlexHolder,
    MonitoringButton,
    NodeSchema,
    NxtDatePicker,
    PerformanceChart,
    ServerLoginTooltip,
    ThumbnailAccordion,
    TsMonitoring,
} from "@nxt-ui/cp/components";

import {AppNodeName} from "../../../../common/application/nodeName";
import {IpbeItemActions} from "../actions";

import "./index.css";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

interface IpbeCardItemProps {
    ipbe: IIpbeListItem;
}

export const IpbeCardItem: FC<IpbeCardItemProps> = ({ipbe}) => {
    const [openTsMonitoring, setOpenTsMonitoring] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {name, nodeId, inputFormat, videoBitrate, ipbeAudioEncoders} = ipbe;

    const {status} = useRealtimeAppData(ipbe, ipbe.nodeId);

    const activeApp = useMemo(() => {
        return Boolean(status === EAppGeneralStatus.active || status === EAppGeneralStatus.error);
    }, [status]);

    const selected = useSelector(commonSelectors.apps.selectedApps);

    const btnRef = useRef<HTMLDivElement | null>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const handleEditIpbe = useCallback(() => {
        setMenuOpen(false);
        navigate(`/ipbe/${ipbe.id}`);
    }, [ipbe.id, navigate]);

    const handleMenuOpen = useCallback(() => {
        setMenuOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
        setMenuOpen(false);
    }, []);

    const handleSelection = useCallback(() => {
        const exist = selected.includes(ipbe.id);
        if (exist) {
            dispatch(commonActions.applicationActions.removeSelectedApplications(ipbe.id));
        } else {
            dispatch(commonActions.applicationActions.setSelectedApplications(ipbe.id));
        }
    }, [selected, dispatch, ipbe.id]);

    const bitrateValue = useMemo(() => {
        if (videoBitrate) {
            return `${(videoBitrate / 1000000).toFixed(2)} Mbps`;
        }
        return "";
    }, [videoBitrate]);

    const closeTsHandler = useCallback(() => {
        return openTsMonitoring && setOpenTsMonitoring(false);
    }, [openTsMonitoring]);

    return (
        <>
            <div className="card-wrap">
                <section className="card-holder">
                    <div className="checkbox-holder">
                        <CheckboxComponent onClick={handleSelection} checked={selected.includes(ipbe.id)} />
                    </div>
                    <div className="card-content">
                        <h4 className="card-title" onClick={handleEditIpbe}>
                            {ipbe.isEndpoint ? (
                                <TooltipComponent className="card-text" arrow={true} title="Endpoint">
                                    <span>
                                        <Icon name="allocation" />
                                    </span>
                                </TooltipComponent>
                            ) : null}
                            <TooltipComponent className="card-text" arrow={true} title={name}>
                                <span>{name}</span>
                            </TooltipComponent>
                        </h4>
                        <Accordion
                            active
                            header={<CardAccordionHeader title={"Encoder"} paragraph={""} />}
                            defaultExpanded>
                            <div className="info-block">
                                <TooltipComponent
                                    className="card-text"
                                    leaveDelay={300}
                                    enterDelay={300}
                                    arrow={true}
                                    title={<ServerLoginTooltip nodeId={nodeId} appId={ipbe.id} />}>
                                    <div className="card-text">
                                        <AppNodeName app={ipbe} nodeId={nodeId} />
                                    </div>
                                </TooltipComponent>
                                <ul className={clsx("card-table-list", ipbeAudioEncoders.length > 4 && "wrap")}>
                                    <li>
                                        <AppRuntimeDisplay app={ipbe} nodeId={nodeId} />
                                    </li>
                                    {ipbeAudioEncoders?.map((item, i) => (
                                        <li key={i}>
                                            <div className="bitrate-holder">
                                                {videoBitrate && <p className="text-small">{bitrateValue}</p>}
                                                <p className="text-small">{`${item.bitrate}kbps ${item.codec}`}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <FlexHolder justify="flex-start" className="card-info">
                                    <div>
                                        <NodeSchema nodeId={nodeId} selected={ipbe.sdiDevice} />
                                        <div className="card-format-holder">
                                            <span className="text-thin">Format:</span>
                                            <span className="text-small">{inputFormat}</span>
                                        </div>
                                    </div>

                                    <CircularProgressWithLabel value={80} />
                                    <AppStatusDisplay nodeId={nodeId} app={ipbe} />
                                    <NxtDatePicker nodeId={nodeId} />
                                </FlexHolder>
                            </div>
                        </Accordion>
                        {ipbe.ipbeDestinations.map((destination, i) => (
                            <PerformanceChart
                                nodeId={nodeId}
                                app={ipbe}
                                key={i}
                                monitor={ipbe.monitoring}
                                destination={destination}
                            />
                        ))}
                        <ThumbnailAccordion app={ipbe} />
                        {/* <Accordion
                        active
                        header={
                            <CardAccordionHeader
                                title={"Media view"}
                                paragraph={format(new Date(), "yyyy-MM-dd'  'HH:mm:ss")}
                            />
                        }>
                        <Thumbnail app={ipbe} />
                    </Accordion> */}
                    </div>
                </section>
                <ul className="card-icon-list">
                    <li>
                        <AppStatusButton app={ipbe} nodeId={nodeId} appType={EAppType.IPBE} />
                    </li>
                    <li>
                        <AppRestartButton app={ipbe} nodeId={nodeId} appType={EAppType.IPBE} />
                    </li>
                    <li>
                        <EditApplication onClick={handleEditIpbe} />
                    </li>
                    <li>
                        <a href={`${window.location.origin}/monitor/history/${EApiAppType.IPBE}/${ipbe.id}`}>
                            <MonitoringButton active />
                        </a>
                    </li>
                    {/* <li>
                    <Button data-type="btn-icon">
                        <Icon name="hub" />
                    </Button>
                </li> */}
                    <li>
                        <TooltipComponent className="card-text" arrow title={<div>Add to favorites</div>}>
                            <div>
                                <Button data-type="btn-icon">
                                    <Icon name="flag" />
                                </Button>
                            </div>
                        </TooltipComponent>
                    </li>
                    <li>
                        <IpbeItemActions
                            nodeId={nodeId}
                            ipbe={ipbe}
                            ref={btnRef}
                            open={menuOpen}
                            onClose={handleMenuClose}
                        />
                        <Button data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
                            <Icon name="properties" />
                        </Button>
                    </li>
                </ul>
            </div>
            <ModalComponent
                className="thumbnail-modal"
                open={openTsMonitoring}
                onClose={closeTsHandler}
                aria-labelledby="thumbnail-modal">
                <TsMonitoring
                    closeMonitoringWrap={closeTsHandler}
                    nodeId={nodeId}
                    app={ipbe}
                    destination={ipbe.ipbeDestinations[0]}
                />
            </ModalComponent>
        </>
    );
};
