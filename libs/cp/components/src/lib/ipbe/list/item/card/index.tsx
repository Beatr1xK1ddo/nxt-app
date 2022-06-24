import {FC, useCallback, useRef, useState} from "react";
import {format} from "date-fns";
import {Icon} from "@nxt-ui/icons";
import {Accordion, Button, CheckboxComponent, CircularProgressWithLabel, TooltipComponent} from "@nxt-ui/components";
import {EAppGeneralStatus, IIpbeListItem, INodesListItem} from "@nxt-ui/cp/types";
import {FlexHolder, NodeName, AppStatus, NxtDatePicker, StatusChangeButton} from "@nxt-ui/cp/components";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import IpbeCardAccordionHeader from "./accordionHeader";
import PerformanceChart from "./performanceChart";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {commonSelectors, CpRootState, ipbeListActions, ipbeListSelectors} from "@nxt-ui/cp-redux";
import {Thumbnail} from "@nxt-ui/cp/components";
import {IpbeItemActions} from "../actions";

interface IpbeCardItemProps {
    ipbe: IIpbeListItem;
}

export const IpbeCardItem: FC<IpbeCardItemProps> = ({ipbe}) => {
    const navigate = useNavigate();

    const {status, runTime} = useRealtimeAppData(ipbe.node, "ipbe2", ipbe.id, ipbe.status, ipbe.startedAtMs);

    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const selected = useSelector(ipbeListSelectors.selectIpbeListSelected);

    const {name, node: nodeId, inputFormat, videoBitrate, sdiDevice, ipbeAudioEncoders} = ipbe;

    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

    const handleEditIpbe = useCallback(() => {
        setMenuOpen(false);
        navigate(`/ipbe/${ipbe.id}`);
    }, [ipbe.id, navigate]);

    const btnRef = useRef<HTMLDivElement | null>(null);

    const handleMenuOpen = useCallback(() => {
        setMenuOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
        setMenuOpen(false);
    }, []);

    const handleChackbox = useCallback(() => {
        const exist = selected.includes(ipbe.id);
        if (exist) {
            dispatch(ipbeListActions.removeSelected(ipbe.id));
        } else {
            dispatch(ipbeListActions.setSelected(ipbe.id));
        }
    }, [selected, dispatch, ipbe.id]);

    const handleCopySsh = useCallback(() => {
        const type = "text/plain";
        const blob = new Blob(["ssh://glebn@s2.nextologies.com"], {type});
        const data = new ClipboardItem({[type]: blob});
        return navigator.clipboard.write([data]);
    }, []);

    return (
        <div className="card-wrap">
            <section className="card-holder">
                <div className="checkbox-holder">
                    <CheckboxComponent onClick={handleChackbox} checked={selected.includes(ipbe.id)} />
                </div>
                <div className="card-content">
                    <h4 className="card-title" onClick={handleEditIpbe}>
                        {ipbe.isEndpoint ? <Icon name="allocation" /> : null} {name}
                    </h4>
                    <Accordion header={<IpbeCardAccordionHeader title={"Info"} paragraph={""} />} defaultExpanded>
                        <div className="info-block">
                            <TooltipComponent
                                className="white-tooltip"
                                arrow={true}
                                title={
                                    <div>
                                        <p className="heading">{node?.hostname || ""}</p>
                                        <dl>
                                            <dt>Code:</dt>
                                            <dd>{node?.digitCode || ""}</dd>
                                        </dl>
                                        <p>
                                            <a href="/">ssh://glebn@s2.nextologies.com</a>
                                        </p>
                                        <div onClick={handleCopySsh}>Copy</div>
                                    </div>
                                }>
                                <div className="card-text">
                                    <NodeName nodeId={nodeId} />
                                </div>
                            </TooltipComponent>
                            <ul className="card-table-list">
                                <li>
                                    <p className="text-small">{runTime}</p>
                                </li>
                                <li>
                                    <span className="text-thin">IDX:</span>
                                    <p className="text-small">{sdiDevice}</p>
                                </li>
                                <li>
                                    <span className="text-thin">Format:</span>
                                    <p className="text-small">{inputFormat}</p>
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
                                <CircularProgressWithLabel value={80} />
                                <AppStatus status={status} />
                                <NxtDatePicker nodeId={nodeId} />
                            </FlexHolder>
                        </div>
                    </Accordion>
                    {ipbe.monitoring &&
                        (status === EAppGeneralStatus.active || status === EAppGeneralStatus.error) &&
                        ipbe.ipbeDestinations.map((destination, i) => (
                            <PerformanceChart key={i} nodeId={ipbe.node} appId={ipbe.id} destination={destination} />
                        ))}
                    <Accordion
                        header={
                            <IpbeCardAccordionHeader
                                title={"Media view"}
                                paragraph={format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}
                            />
                        }>
                        <Thumbnail type="ipbe" id={ipbe.id} />
                    </Accordion>
                </div>
            </section>
            <ul className="card-icon-list">
                <li>
                    <StatusChangeButton appId={ipbe.id} status={status} name={name} />
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
                    />
                    <Button data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
                        <Icon name="properties" />
                    </Button>
                </li>
            </ul>
        </div>
    );
};
