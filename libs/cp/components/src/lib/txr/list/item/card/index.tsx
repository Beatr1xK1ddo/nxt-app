import {FC, useCallback, useRef, useState} from "react";

import {Icon} from "@nxt-ui/icons";
import {Button, CheckboxComponent, CircularProgressWithLabel, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {EAppType, ITxrListItem} from "@nxt-ui/cp/types";
import {FlexHolder, Thumbnail, NodeName, AppStatusDisplay} from "@nxt-ui/cp/components";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, txrListActions, txrListSelectors} from "@nxt-ui/cp-redux";
import ProxyStatus from "./proxyStatus";

interface TxrCardItemProps {
    txr: ITxrListItem;
}

export const TxrCardItem: FC<TxrCardItemProps> = ({txr}) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const {
        name,
        appType,
        sourceIp,
        destinationIp,
        txNodeId,
        rxNodeId,
        sourcePort,
        destinationPort,
        status,
        proxyServersIds,
    } = txr;

    const handleDeleteTxr = useCallback(() => {
        dispatch(
            commonActions.applicationActions.removeApplications({data: {id: txr.id, name}, appType: EAppType.TXR})
        );
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

    const selected = useSelector(txrListSelectors.selectTxrListSelected);
    const handleSelection = useCallback(() => {
        const exist = selected.includes(txr.id);
        if (exist) {
            dispatch(txrListActions.removeSelected(txr.id));
        } else {
            dispatch(txrListActions.setSelected(txr.id));
        }
    }, [selected, dispatch, txr.id]);

    return (
        <div className="card-wrap">
            <section className="card-holder">
                <div className="checkbox-holder">
                    <CheckboxComponent onClick={handleSelection} checked={selected.includes(txr.id)} />
                </div>
                <div className="card-content">
                    <h4 className="card-title" onClick={handleEditTxr}>
                        <Icon name="allocation" /> <span>{name}</span>
                    </h4>
                    <div className="transfer-info-flags">
                        <div>{appType}</div>
                        <ProxyStatus proxyServersIds={proxyServersIds} />
                    </div>
                    <div className="info-block">
                        <ul className="card-transfer-block">
                            <li>
                                <span className="text-thin">
                                    {sourceIp}:{sourcePort}
                                </span>
                                <br />
                                <span className="text-small">{txNodeId && <NodeName nodeId={txNodeId} />}</span>
                            </li>
                            <li>&rarr;</li>
                            <li>
                                <span className="text-thin">
                                    {destinationIp}:{destinationPort}
                                </span>
                                <br />
                                <span className="text-small">{rxNodeId && <NodeName nodeId={rxNodeId} />}</span>
                            </li>
                        </ul>

                        <FlexHolder justify="flex-start" className="card-info">
                            <Thumbnail type="txr" id={txr.id} />
                            <CircularProgressWithLabel value={80} />
                            <AppStatusDisplay app={txr} nodeId={txr.rxNodeId} />
                            {/* <NxtDatePicker nodeId={node} /> */}
                        </FlexHolder>
                    </div>
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
                        <Icon name="move" />
                    </Button>
                </li>
                <li>
                    <Button data-type="btn-icon">
                        <Icon name="copy" />
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
