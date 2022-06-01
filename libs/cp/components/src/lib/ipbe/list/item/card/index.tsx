import {FC, useCallback, useMemo, useRef, useState} from "react";
import {format} from "date-fns";

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
import {EAppGeneralStatus, IIpbeListItem} from "@nxt-ui/cp/types";
import {FlexHolder, NodeName, NodeStatus, NxtDatePicker} from "@nxt-ui/cp/components";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

import IpbeCardAccordionHeader from "./accordionHeader";
import PerformanceChart from "./performanceChart";

import "./index.css";
import {useNavigate} from "react-router-dom";

interface IpbeCardItemProps {
    ipbe: IIpbeListItem;
}

export const IpbeCardItem: FC<IpbeCardItemProps> = ({ipbe}) => {
    const navigate = useNavigate();
    const {status, runTime} = useRealtimeAppData(ipbe.node, "ipbe", ipbe.id, ipbe.status, ipbe.startedAtMs);

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const {name, node, inputFormat, videoBitrate, sdiDevice, ipbeAudioEncoders} = ipbe;

    // const imageCss = useMemo(() => ({backgroundImage: `url(${img})`}), []);

    /*
     const thumbnail = useMemo(() => {
     return <img style={{ width: '100%', aspectRatio: '16/9' }} src={thumbnail} />;
     }, [thumbnail]);
     */

    const thumbnail = useMemo(() => {
        return <img style={{width: "100%", aspectRatio: "16/9"}} alt={"ipbe thumbnail"} />;
    }, []);

    const MenuArr = [
        {id: 1, content: "menu item 1"},
        {id: 2, content: "menu item 2"},
    ];
    const btnRef = useRef<HTMLDivElement | null>(null);

    const handleMenuOpen = useCallback(() => {
        setMenuOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
        setMenuOpen(false);
    }, []);

    const handleEditIpbe = useCallback(() => {
        navigate(`/ipbe/${ipbe.id}`);
    }, [ipbe.id, navigate]);

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
                    <Accordion header={<IpbeCardAccordionHeader title={"Info"} paragraph={""} />} defaultExpanded>
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
                                <p className="card-text">
                                    <NodeName nodeId={node} />
                                </p>
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
                                        {ipbeAudioEncoders?.map((item) => (
                                            <p className="text-small">{`${item.bitrate}kbps ${item.codec}`}</p>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                            <FlexHolder justify="flex-start" className="card-info">
                                <CircularProgressWithLabel value={80} />
                                <NxtDatePicker nodeId={node} />
                                <NodeStatus status={status} />
                            </FlexHolder>
                        </div>
                    </Accordion>
                    {ipbe.monitoring &&
                        (status === EAppGeneralStatus.active || status === EAppGeneralStatus.error) &&
                        ipbe.ipbeDestinations.map((destination) => (
                            <PerformanceChart nodeId={ipbe.node} destination={destination} />
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
                    <MenuComponent
                        anchorEl={btnRef.current}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                        className="test">
                        {MenuArr.map((item) => (
                            <MenuItemStyled key={item.id} onClick={handleMenuClose}>
                                {item.content}
                            </MenuItemStyled>
                        ))}
                    </MenuComponent>
                    <Button data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
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
