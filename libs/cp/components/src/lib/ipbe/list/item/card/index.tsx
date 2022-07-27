import {FC, useCallback, useRef, useState} from "react";
import {format} from "date-fns";
import {Icon} from "@nxt-ui/icons";
import {Accordion, Button, CheckboxComponent, CircularProgressWithLabel, TooltipComponent} from "@nxt-ui/components";
import {EAppGeneralStatus, EAppType, IIpbeListItem, INodesListItem} from "@nxt-ui/cp/types";
import {
    FlexHolder,
    NodeName,
    AppStatusDisplay,
    NxtDatePicker,
    ServerLoginTooltip,
    AppStatusButton,
    NodeSchema,
} from "@nxt-ui/cp/components";
import IpbeCardAccordionHeader from "./accordionHeader";
import PerformanceChart from "./performanceChart";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {commonSelectors, CpRootState, ipbeListActions, ipbeListSelectors} from "@nxt-ui/cp-redux";
import {Thumbnail} from "@nxt-ui/cp/components";
import {IpbeItemActions} from "../actions";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

interface IpbeCardItemProps {
    ipbe: IIpbeListItem;
}

export const IpbeCardItem: FC<IpbeCardItemProps> = ({ipbe}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {name, node: nodeId, inputFormat, videoBitrate, sdiDevice, ipbeAudioEncoders, id} = ipbe;

    const selected = useSelector(ipbeListSelectors.selectIpbeListSelected);
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );
    const {status, runTime} = useRealtimeAppData(nodeId, EAppType.IPBE, id);

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
                                    <span className="text-small">
                                        {status === EAppGeneralStatus.active ? (
                                            <p className="text-small">{runTime}</p>
                                        ) : null}
                                    </span>
                                    {/* <span className="text-small">{runTime}</span> */}
                                </li>
                                {ipbeAudioEncoders?.map((item, i) => (
                                    <li key={i}>
                                        <div className="bitrate-holder">
                                            {videoBitrate && <p className="text-small">{`${videoBitrate}Mbps`}</p>}
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
                    {ipbe.monitoring &&
                        (status === EAppGeneralStatus.active || status === EAppGeneralStatus.error) &&
                        ipbe.ipbeDestinations.map((destination, i) => (
                            <PerformanceChart key={i} nodeId={ipbe.node} destination={destination} />
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
                    <AppStatusButton app={ipbe} nodeId={nodeId} />
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
                        nodeId={nodeId}
                    />
                    <Button data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
                        <Icon name="properties" />
                    </Button>
                </li>
            </ul>
        </div>
    );
};
