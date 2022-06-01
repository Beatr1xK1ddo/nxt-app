import {FC, useCallback, useRef, useState} from "react";

import {Button, CheckboxComponent, CircularProgressWithLabel, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {NodeSchema, NodeStatus, NxtDatePicker} from "@nxt-ui/cp/components";
import {IIpbeListItem} from "@nxt-ui/cp/types";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

import {Caption} from "./caption";
import Destination from "./destoination";

import "./index.css";

interface IpbeListItemProps {
    ipbe: IIpbeListItem;
}

export const IpbeRowItem: FC<IpbeListItemProps> = ({ipbe}) => {
    const {name, node, ipbeDestinations, inputFormat, ipbeAudioEncoders, videoBitrate, sdiDevice} = ipbe;

    const {status, runTime} = useRealtimeAppData(node, "ipbe", ipbe.id, ipbe.status, ipbe.startedAtMs);

    const inputsNodeScheme = [
        {id: 1, portAlert: "Signal good", status: "available"},
        {id: 2, portAlert: "Signal good", status: "free"},
        {id: 3, portAlert: "Signal good", status: "neutral"},
        {id: 4, portAlert: "Signal good", status: "unavailable"},
        {id: 5, portAlert: "Signal good", status: "available"},
        {id: 6, portAlert: "Signal good", status: "unavailable"},
        {id: 7, portAlert: "Signal good", status: "neutral"},
        {id: 8, portAlert: "Signal good", status: "free"},
    ];

    const [openProperties, setOpenProperties] = useState(false);

    const MenuArr = [
        {id: 1, content: "menu item 1"},
        {id: 2, content: "menu item 2"},
    ];
    const propertiesRef = useRef<HTMLDivElement | null>(null);

    const openPropertiesHanndler = useCallback(() => {
        setOpenProperties(true);
    }, []);

    const closePropertiesHandler = useCallback(() => {
        setOpenProperties(false);
    }, []);

    return (
        <li className="card-table">
            <div className="card-table-checkbox">
                <CheckboxComponent />
            </div>
            <div className="card-table-info">
                <Caption name={name} nodeId={node} />
            </div>
            <div className="card-table-status">
                <CircularProgressWithLabel value={80} />
                <NodeStatus status={status} />
                <NxtDatePicker nodeId={node} />
            </div>
            <div className="card-table-runtime">
                <span className="text-small">{runTime}</span>
                {/*<span className="text-small">{runRef.current || "08h 41m"}</span>*/}
            </div>
            <div className="card-table-input">
                <p className="text-small">
                    <span className="text-thin">{`IDX: `}</span>
                    {sdiDevice?.toString() || "-"}
                </p>
                <p className="text-small">
                    <span className="text-thin">{`Format: `}</span>
                    {inputFormat}
                </p>
            </div>
            <div className="card-table-bitrate">
                <div className="bitrate-holder">
                    {videoBitrate && <span className="text-small">{`${videoBitrate}Mbps`}</span>}
                    {ipbeAudioEncoders?.map((item) => (
                        <span key={item.id} className="text-small">{`${item.bitrate}kbps ${item.codec}`}</span>
                    ))}
                </div>
            </div>
            <div className="card-table-destination">
                {ipbeDestinations?.map((destination) => (
                    <Destination ipbe={ipbe} destination={destination} />
                ))}
            </div>
            <div className="schema-row-holder">
                <NodeSchema inputsImgs={inputsNodeScheme} />
                <NodeSchema inputsImgs={inputsNodeScheme} />
            </div>

            <div className="card-table-actions">
                <MenuComponent
                    anchorEl={propertiesRef.current}
                    open={openProperties}
                    onClose={closePropertiesHandler}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                    className="test">
                    {MenuArr.map((item) => (
                        <MenuItemStyled key={item.id} onClick={closePropertiesHandler}>
                            {item.content}
                        </MenuItemStyled>
                    ))}
                </MenuComponent>
                <Button data-type="btn-icon" onClick={openPropertiesHanndler} btnRef={propertiesRef}>
                    <Icon name="properties" />
                </Button>
            </div>
        </li>
    );
};
