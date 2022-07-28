import {FC, useCallback, useRef, useState} from "react";
import {format} from "date-fns";
import {Icon} from "@nxt-ui/icons";
import {Accordion, Button, CheckboxComponent, CircularProgressWithLabel, TooltipComponent} from "@nxt-ui/components";
import {EAppGeneralStatus, EAppType, IIpbeListItem, INodesListItem} from "@nxt-ui/cp/types";
import {
    AppStatusButton,
    AppStatusDisplay,
    FlexHolder,
    NodeName,
    NodeSchema,
    NxtDatePicker,
    ServerLoginTooltip,
    Thumbnail,
} from "@nxt-ui/cp/components";
import {useRealtimeAppData, useStatusChangeNotification} from "@nxt-ui/cp/hooks";
import IpbeCardAccordionHeader from "./accordionHeader";
import PerformanceChart from "./performanceChart";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {commonSelectors, CpRootState, ipbeListActions, ipbeListSelectors} from "@nxt-ui/cp-redux";
import {IpbeItemActions} from "../actions";

interface IpbeCardItemProps {
    ipbe: IIpbeListItem;
}

export const IpbeCardItem: FC<IpbeCardItemProps> = ({ipbe}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        name,
        node: nodeId,
        inputFormat,
        videoBitrate,
        sdiDevice,
        ipbeAudioEncoders,
        startedAtMs,
        id,
        status: initialStatus,
    } = ipbe;
    const {status, runTime} = useRealtimeAppData(nodeId, "ipbe2", id, startedAtMs);

    const {currentStatus} = useStatusChangeNotification(name, initialStatus, status);

    const selected = useSelector(ipbeListSelectors.selectIpbeListSelected);
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

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
            dispatch(ipbeListActions.removeSelected(ipbe.id));
        } else {
            dispatch(ipbeListActions.setSelected(ipbe.id));
        }
    }, [selected, dispatch, ipbe.id]);

    return (
        <div className="card-wrap">
            <section className="card-holder">
                <div className="checkbox-holder">
                    <CheckboxComponent onClick={handleSelection} checked={selected.includes(ipbe.id)} />
                </div>
                <div className="card-content">
                    <h4 className="card-title" onClick={handleEditIpbe}>
                        {ipbe.isEndpoint ? <Icon name="allocation" /> : null} <span>{name}</span>
                    </h4>
                    <Accordion header={<IpbeCardAccordionHeader title={"Encoder"} paragraph={""} />} defaultExpanded>
                        <div className="info-block">
                            <TooltipComponent
                                className="white-tooltip"
                                arrow={true}
                                title={<ServerLoginTooltip hostname={node?.hostname} digitCode={node?.digitCode} />}
                            >
                                <div className="card-text">
                                    <NodeName nodeId={nodeId} />
                                </div>
                            </TooltipComponent>
                            <ul className="card-table-list">
                                <li>
                                    <div className="bitrate-holder">
                                        {videoBitrate && <p className="text-small">{`${videoBitrate}Mbps`}</p>}
                                        {ipbeAudioEncoders?.map((item, i) => (
                                            <p key={i} className="text-small">{`${item.bitrate}kbps ${item.codec}`}</p>
                                        ))}
                                    </div>
                                </li>
                                <li>
                                    <div className="bitrate-holder">
                                        {videoBitrate && <p className="text-small">{`${videoBitrate}Mbps`}</p>}
                                        {ipbeAudioEncoders?.map((item, i) => (
                                            <p key={i} className="text-small">{`${item.bitrate}kbps ${item.codec}`}</p>
                                        ))}
                                    </div>
                                </li>
                                <li>
                                    <div className="bitrate-holder">
                                        {videoBitrate && <p className="text-small">{`${videoBitrate}Mbps`}</p>}
                                        {ipbeAudioEncoders?.map((item, i) => (
                                            <p key={i} className="text-small">{`${item.bitrate}kbps ${item.codec}`}</p>
                                        ))}
                                    </div>
                                </li>
                                <li>
                                    <div className="bitrate-holder">
                                        {videoBitrate && <p className="text-small">{`${videoBitrate}Mbps`}</p>}
                                        {ipbeAudioEncoders?.map((item, i) => (
                                            <p key={i} className="text-small">{`${item.bitrate}kbps ${item.codec}`}</p>
                                        ))}
                                    </div>
                                </li>
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
                                <AppStatusDisplay status={currentStatus} />
                                <NxtDatePicker nodeId={nodeId} />
                            </FlexHolder>
                        </div>
                    </Accordion>
                    {ipbe.monitoring &&
                        (currentStatus === EAppGeneralStatus.active || currentStatus === EAppGeneralStatus.error) &&
                        ipbe.ipbeDestinations.map((destination, i) => (
                            <PerformanceChart key={i} nodeId={ipbe.node} appId={ipbe.id} destination={destination} />
                        ))}
                    <Accordion
                        header={
                            <IpbeCardAccordionHeader
                                title={"Media view"}
                                paragraph={format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}
                            />
                        }
                    >
                        <Thumbnail type="ipbe" id={ipbe.id} />
                    </Accordion>
                </div>
            </section>
            <ul className="card-icon-list">
                <li>
                    <AppStatusButton status={EAppGeneralStatus.new} app={ipbe} appType={EAppType.IPBE} />
                </li>
                <li>
                    <Button data-type="btn-icon" onClick={handleEditIpbe}>
                        <Icon name="edit" />
                    </Button>
                </li>
                <li>
                    <Button data-type="btn-icon">
                        <Icon name="chart" />
                    </Button>
                </li>
                <li>
                    <Button data-type="btn-icon">
                        <Icon name="hub" />
                    </Button>
                </li>
                <li>
                    <Button data-type="btn-icon">
                        <Icon name="flag" />
                    </Button>
                </li>
                <li>
                    <IpbeItemActions
                        ref={btnRef}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        id={ipbe.id}
                        name={ipbe.name}
                        status={currentStatus}
                    />
                    <Button data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
                        <Icon name="properties" />
                    </Button>
                </li>
            </ul>
        </div>
    );
};
