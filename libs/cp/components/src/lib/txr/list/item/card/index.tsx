import {FC, useCallback, useRef, useState} from "react";

import {Icon} from "@nxt-ui/icons";
import {
    Button,
    CheckboxComponent,
    CircularProgressWithLabel,
    MenuComponent,
    MenuItemStyled,
    TooltipComponent,
} from "@nxt-ui/components";
import {INodesListItem, ITxrListItem} from "@nxt-ui/cp/types";
import {FlexHolder, Thumbnail} from "@nxt-ui/cp/components";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {commonSelectors, CpRootState, txrCommonActions} from "@nxt-ui/cp-redux";

interface TxrCardItemProps {
    txr: ITxrListItem;
}

export const TxrCardItem: FC<TxrCardItemProps> = ({txr}) => {
    console.log("txr", txr);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    //const {status, runTime} = useRealtimeAppData(txr.node, "txr", txr.id, txr.startedAtMs);

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const {name, appType, sourceIp, destinationIp, txNode, rxNode, sourcePort, destinationPort} = txr;

    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, txNode)
    );

    const handleDeleteTxr = useCallback(() => {
        dispatch(txrCommonActions.removeTxrs({id: txr.id, name}));
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

    return (
        <div className="card-wrap">
            <section className="card-holder">
                <div className="checkbox-holder">
                    <CheckboxComponent />
                </div>
                <div className="card-content">
                    <h4 className="card-title" onClick={handleEditTxr}>
                        <Icon name="allocation" /> {name}
                    </h4>
                    <div className="transfer-info-flags">
                        <div>{appType}</div>
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
                    <div className="info-block">
                        <ul className="card-transfer-block">
                            <li>
                                <span className="text-thin">
                                    {sourceIp}:{sourcePort}
                                </span>
                                <br />
                                <span className="text-small">devbox22 - Gleb (devbox22) - A192548</span>
                            </li>
                            <li>&rarr;</li>
                            <li>
                                <span className="text-thin">
                                    {destinationIp}:{destinationPort}
                                </span>
                                <br />
                                <span className="text-small">GLEB (dev-notebook) (gleb-dev-pc) - C627598</span>
                            </li>
                        </ul>

                        <FlexHolder justify="flex-start" className="card-info">
                            <Thumbnail type="txr" id={txr.id} />
                            <CircularProgressWithLabel value={80} />
                            {/* <AppStatus status={status} /> */}
                            {/* <NxtDatePicker nodeId={node} /> */}
                        </FlexHolder>
                    </div>
                    {/* {txr.monitoring &&
                     (status === EAppGeneralStatus.active || status === EAppGeneralStatus.error) &&
                     txr.txrDestinations.map((destination, i) => (
                     <PerformanceChart key={i} nodeId={txr.node} destination={destination} />
                     ))} */}
                    {/* <Accordion
                     header={
                     <TxrCardAccordionHeader
                     title={"Media view"}
                     paragraph={format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}
                     />
                     }>
                     <Thumbnail type="txr" id={txr.id} />
                     </Accordion> */}
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
