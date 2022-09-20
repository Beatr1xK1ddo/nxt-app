import {FC, useCallback, useRef, useState} from "react";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import clsx from "clsx";

import {Icon} from "@nxt-ui/icons";
import {Accordion, Button, CheckboxComponent, CircularProgressWithLabel, TooltipComponent} from "@nxt-ui/components";
import {EAppType, IIpbeListItem} from "@nxt-ui/cp/types";
import {commonActions, commonSelectors, ipbeListSelectors} from "@nxt-ui/cp-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {
    AppRuntimeDisplay,
    AppStatusButton,
    AppStatusDisplay,
    CardAccordionHeader,
    EditApplication,
    FlexHolder,
    MonitoringButton,
    NodeSchema,
    NxtDatePicker,
    PerformanceChart,
    ServerLoginTooltip,
    Thumbnail,
} from "@nxt-ui/cp/components";

import {AppNodeName} from "../../../../common/application/nodeName";
import {IpbeItemActions} from "../actions";

import "./index.css";

interface IpbeCardItemProps {
    ipbe: IIpbeListItem;
}

export const IpbeCardItem: FC<IpbeCardItemProps> = ({ipbe}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {name, nodeId, inputFormat, videoBitrate, ipbeAudioEncoders} = ipbe;

    const selected = useSelector(commonSelectors.apps.selectedApps);
    const {status} = useRealtimeAppData(ipbe, nodeId);

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
                    <Accordion active header={<CardAccordionHeader title={"Encoder"} paragraph={""} />} defaultExpanded>
                        <div className="info-block">
                            <TooltipComponent
                                className="white-tooltip"
                                arrow={true}
                                title={<ServerLoginTooltip nodeId={nodeId} />}
                            >
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
                    {ipbe.ipbeDestinations.map((destination, i) => (
                        <PerformanceChart
                            key={i}
                            status={status}
                            monitor={ipbe.monitoring}
                            nodeId={ipbe.nodeId}
                            destination={destination}
                        />
                    ))}
                    <Accordion
                        active
                        header={
                            <CardAccordionHeader
                                title={"Media view"}
                                paragraph={format(new Date(), "yyyy-MM-dd'  'HH:mm:ss")}
                            />
                        }
                    >
                        <Thumbnail type="ipbe" id={ipbe.id} />
                    </Accordion>
                </div>
            </section>
            <ul className="card-icon-list">
                <li>
                    <AppStatusButton app={ipbe} nodeId={nodeId} appType={EAppType.IPBE} />
                </li>
                <li>
                    <EditApplication onClick={handleEditIpbe} />
                </li>
                <li>
                    <MonitoringButton />
                </li>
                {/* <li>
                    <Button data-type="btn-icon">
                        <Icon name="hub" />
                    </Button>
                </li>
                <li>
                    <Button data-type="btn-icon">
                        <Icon name="flag" />
                    </Button>
                </li> */}
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
    );
};
