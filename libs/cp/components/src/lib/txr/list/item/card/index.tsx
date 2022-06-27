import {FC, useCallback, useRef, useState} from "react";
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
import {EAppGeneralStatus, IIpbeListItem, INodesListItem} from "@nxt-ui/cp/types";
import {FlexHolder, NodeName, AppStatus, NxtDatePicker} from "@nxt-ui/cp/components";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import IpbeCardAccordionHeader from "./accordionHeader";
import PerformanceChart from "./performanceChart";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {commonSelectors, CpRootState, ipbeCommonActions} from "@nxt-ui/cp-redux";
import {Thumbnail} from "@nxt-ui/cp/components";

interface IpbeCardItemProps {
    ipbe: IIpbeListItem;
}

export const TxrCardItem: FC<IpbeCardItemProps> = ({ipbe}) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {status, runTime} = useRealtimeAppData(ipbe.node, "ipbe", ipbe.id, ipbe.startedAtMs);

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const {name, node: nodeId, inputFormat, videoBitrate, sdiDevice, ipbeAudioEncoders} = ipbe;

    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

    const handleDeleteIpbe = useCallback(() => {
        dispatch(ipbeCommonActions.removeIpbes({id: ipbe.id, name}));
    }, [ipbe.id, dispatch, name]);

    const handleEditIpbe = useCallback(() => {
        setMenuOpen(false);
        navigate(`/txr/${ipbe.id}`);
    }, [ipbe.id, navigate]);

    const btnRef = useRef<HTMLDivElement | null>(null);

    const handleMenuOpen = useCallback(() => {
        setMenuOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
        setMenuOpen(false);
    }, []);

    return (
        <div className="card-wrap">
            <section className="card-holder">
                <div className="checkbox-holder">
                    <CheckboxComponent />
                </div>
                <div className="card-content">
                    <h4 className="card-title" onClick={handleEditIpbe}>
                        <Icon name="allocation" /> {name}
                    </h4>
                    <div className="transfer-info-flags">
                        <div>tstransmitter6_rtp</div>
                        <TooltipComponent
                            className="transfer-tooltip"
                            arrow={true}
                            title={
                                <p className="transfer-tooltip-title">
                                    PROXY SERVER
                                    <br />
                                    <strong>test_dv_proxy1</strong>
                                    <br />
                                    209.49.221.4:10001 / 1500
                                </p>
                            }>
                            <div className="proxy-on">proxy ON</div>
                        </TooltipComponent>
                        <div className="proxy-off">proxy OFF</div>
                    </div>
                    <Accordion header={<IpbeCardAccordionHeader title={"Info"} paragraph={""} />} defaultExpanded>
                        <div className="info-block">
                            <ul className="card-transfer-block">
                                <li>
                                    <span className="text-thin">239.0.0.4:11848</span>
                                    <br />
                                    <span className="text-small">devbox22 - Gleb (devbox22) - A192548</span>
                                </li>
                                <li>&rarr;</li>
                                <li>
                                    <span className="text-thin">239.10.15.122:1234</span>
                                    <br />
                                    <span className="text-small">GLEB (dev-notebook) (gleb-dev-pc) - C627598</span>
                                </li>
                            </ul>

                            <FlexHolder justify="flex-start" className="card-info">
                                <Thumbnail type="ipbe" id={ipbe.id} />
                                <CircularProgressWithLabel value={80} />
                                <AppStatus status={status} />
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
                        }>
                        <Thumbnail type="ipbe" id={ipbe.id} />
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
                    <MenuComponent anchorEl={btnRef.current} open={menuOpen} onClose={handleMenuClose}>
                        <MenuItemStyled onClick={handleEditIpbe}>Edit</MenuItemStyled>
                        <MenuItemStyled onClick={handleDeleteIpbe}>Delete</MenuItemStyled>
                    </MenuComponent>
                    <Button data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
                        <Icon name="properties" />
                    </Button>
                </li>
            </ul>
        </div>
    );
};
