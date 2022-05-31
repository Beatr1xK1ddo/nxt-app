import {FC, useMemo} from "react";
import {Icon} from "@nxt-ui/icons";
import {format, formatDistance} from "date-fns";

import {Accordion, CheckboxComponent, Button, CircularProgressWithLabel, TooltipComponent} from "@nxt-ui/components";
import {EAppGeneralStatus, IIpbeListItem} from "@nxt-ui/cp/types";

import {NodeStatus} from "../../../../common";
import {FlexHolder} from "../../../../../index";

import IpbeCardAccordionHeader from "./accordionHeader";
import PerformanceChart from "./performanceChart";

import "./index.css";

interface IpbeCardItemProps {
    item: IIpbeListItem;
    appStatus: EAppGeneralStatus;
    startedAt: null | number;
}

export const IpbeCardItem: FC<IpbeCardItemProps> = ({item, appStatus, startedAt}) => {
    const {name, inputFormat, videoBitrate, cardIdx, ipbeAudioEncoders} = item;

    const thumbnail = useMemo(() => {
        return <img style={{width: "100%", aspectRatio: "16/9"}} alt={"ipbe thumbnail"} />;
    }, []);

    const runTime = useMemo(() => {
        if (appStatus === EAppGeneralStatus.active && startedAt) {
            return formatDistance(startedAt, new Date(), {addSuffix: false});
        } else {
            return "-";
        }
    }, [appStatus, startedAt]);

    return (
        <li className="card-wrap">
            <section className="card-holder">
                <div className="checkbox-holder">
                    <CheckboxComponent />
                </div>
                <div className="card-content">
                    <h4 className="card-title">
                        <Icon name="allocation" /> {name}
                    </h4>
                    <Accordion header={<IpbeCardAccordionHeader title={"Info"} paragraph={""} />}>
                        <div className="info-block">
                            <TooltipComponent
                                className="white-tooltip"
                                arrow={true}
                                title={
                                    <>
                                        <p className="heading">NXT-RXm3-4S-359</p>
                                        <dl>
                                            <dt>Code:</dt>
                                            <dd>M963245</dd>
                                        </dl>
                                        <p>
                                            <a href="/">central login ssh nxta@localhost -p 48241</a>
                                        </p>
                                        <a href="/">Applications dashboard</a>
                                    </>
                                }>
                                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit?</p>
                            </TooltipComponent>
                            <ul className="card-table-list">
                                <li>
                                    <p className="text-small">{runTime}</p>
                                </li>
                                <li>
                                    <span className="text-thin">IDX:</span>
                                    <p className="text-small">{cardIdx}</p>
                                </li>
                                <li>
                                    <span className="text-thin">Format:</span>
                                    <p className="text-small">{inputFormat}</p>
                                </li>
                                <li>
                                    <div className="bitrate-holder">
                                        {videoBitrate && <p className="text-small">{`${videoBitrate}Mbps`}</p>}
                                        {ipbeAudioEncoders?.map((item) => (
                                            <p className="text-small">{`${item.bitrate}kbps ${item.codec}`}</p>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                            <FlexHolder justify="flex-start" className="card-info">
                                <CircularProgressWithLabel value={80} />
                                <NodeStatus status={appStatus} />
                                <Button data-type="btn-icon">
                                    <Icon name="calendar" />
                                </Button>
                            </FlexHolder>
                        </div>
                    </Accordion>
                    {item.monitoring &&
                        item.ipbeDestinations.map((destination) => (
                            <PerformanceChart nodeId={item.node} destination={destination} />
                        ))}
                    <Accordion
                        header={
                            <IpbeCardAccordionHeader
                                title={"Media view"}
                                paragraph={format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}
                            />
                        }>
                        {thumbnail}
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
                    <Button data-type="btn-icon">
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
                    <Button data-type="btn-icon">
                        <Icon name="properties" />
                    </Button>
                </li>
            </ul>
            {/* <div className="card-img" style={imageCss} />
            <div className="card-destination">
                <div className="card-destination-wrap">
                    {ipbeDestinations?.map((item) => (
                        <div className="text-small-blue">{`${item.outputIp}:${item.outputPort}`}</div>
                    ))}
                </div>
                <div className="block-icon">
                    <Icon name="plus" />
                </div>
            </div> */}
        </li>
    );
};
