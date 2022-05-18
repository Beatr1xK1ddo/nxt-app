import {FC, useMemo} from "react";
import {Icon} from "@nxt-ui/icons";
import {format, formatDistance} from "date-fns";

import {Accordion, CheckboxComponent} from "@nxt-ui/components";
import {EAppGeneralStatus, IIpbeListItem} from "@nxt-ui/cp/types";

import {Status} from "../status";
import {CardAccordionTitle} from "./accordion-title";

import "./cardview.css";

import img from "../img.png";

interface IpbeCardItemProps {
    item: IIpbeListItem;
    appStatus: EAppGeneralStatus;
    startedAt: null | number;
}

export const IpbeCardItem: FC<IpbeCardItemProps> = ({item, appStatus, startedAt}) => {
    const {name, nodeText, ipbeDestinations, inputFormat, videoBitrate, cardIdx, ipbeAudioEncoders} = item;

    const imageCss = useMemo(() => ({backgroundImage: `url(${img})`}), []);

    /*
     const thumbnail = useMemo(() => {
     return <img style={{ width: '100%', aspectRatio: '16/9' }} src={thumbnail} />;
     }, [thumbnail]);
     */

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

    const performanceChart = useMemo(() => {
        return (
            <div style={{width: "100%", aspectRatio: "16/9", backgroundColor: "cyan"}}>Performance chart goes here</div>
        );
    }, []);

    return (
        <li className="card-wrap">
            <div className="card-block">
                <div className="card-left">
                    <CheckboxComponent />
                </div>
                <div className="card-right">
                    <h4 className="card-title">{name}</h4>
                </div>
            </div>

            <div className="card-block">
                <div className="card-left">
                    <div className="card-img" style={imageCss} />
                </div>
                <div className={"card-right"}>
                    <p className={"card-text"}>{nodeText}</p>
                </div>
            </div>

            <div className="card-block">
                <div className="card-left">
                    <div className="card-status">
                        <div className="block-icon">
                            <Icon name="calendar" />
                        </div>
                        <Status status={appStatus} />
                    </div>
                </div>
                <div className="card-right">
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
                            <div className={"scroll"}>
                                {videoBitrate && <p className="text-small">{`${videoBitrate}Mbps`}</p>}
                                {ipbeAudioEncoders?.map((item) => (
                                    <p className="text-small">{`${item.bitrate}kbps ${item.codec}`}</p>
                                ))}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card-block">
                <div className="card-left" />
                <div className="card-right">
                    <div className="card-destination">
                        <div className="card-destination-wrap">
                            {ipbeDestinations?.map((item) => (
                                <div className="text-small-blue">{`${item.outputIp}:${item.outputPort}`}</div>
                            ))}
                        </div>
                        <div className="block-icon">
                            <Icon name="plus" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-block">
                <Accordion
                    style={{
                        background: "transparent",
                        ".MuiButtonBase-root": {
                            padding: 0,
                            minHeight: 0,
                            ".MuiAccordionSummary-expandIconWrapper": {
                                marginRight: "1px",
                            },
                        },
                    }}
                    header={<CardAccordionTitle title={"Performance chart"} paragraph={"239.5.171.8:1234 - 2Mbps"} />}
                    content={performanceChart}
                />
            </div>

            <div className="card-block">
                <Accordion
                    style={{
                        background: "transparent",
                        ".MuiButtonBase-root": {
                            padding: 0,
                            minHeight: 0,
                            ".MuiAccordionSummary-expandIconWrapper": {
                                marginRight: "1px",
                            },
                        },
                    }}
                    header={
                        <CardAccordionTitle
                            title={"Media view"}
                            paragraph={format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}
                        />
                    }
                    content={thumbnail}
                />
            </div>

            <div className="card-block">
                <ul className="card-icon-list">
                    <li>
                        <Icon name="pause" />
                    </li>
                    <li>
                        <Icon name="arrows" />
                    </li>
                    <li>
                        <Icon name="copy" />
                    </li>
                    <li>
                        <Icon name="save" />
                    </li>
                    <li>
                        <Icon name="properties" />
                    </li>
                </ul>
            </div>
        </li>
    );
};
