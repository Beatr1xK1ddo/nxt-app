import {FC, useCallback, useMemo, useRef, useState} from "react";
import {formatDistance} from "date-fns";

import {CheckboxComponent, Button, CircularProgressWithLabel, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {NodeStatus, NodeSchema, NxtDatePicker} from "@nxt-ui/cp/components";

import "./index.css";

import {EAppGeneralStatus, IIpbeListItem} from "@nxt-ui/cp/types";
import {Caption} from "./caption";

interface IpbeListItemProps {
    item: IIpbeListItem;
    status: EAppGeneralStatus;
    startedAt: null | number;
}

export const IpbeRowItem: FC<IpbeListItemProps> = ({item, status, startedAt}) => {
    const {name, node, ipbeDestinations, inputFormat, ipbeAudioEncoders, videoBitrate, sdiDevice} = item;

    const runTime = useMemo(() => {
        if (status === EAppGeneralStatus.active && startedAt) {
            return formatDistance(startedAt, new Date(), {addSuffix: false});
        } else {
            return "-";
        }
    }, [status, startedAt]);

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
                {ipbeDestinations?.map((item) => (
                    <div className="card-table-destination-holder">
                        <span key={item.id} className="text-small-blue">{`${item.outputIp}:${item.outputPort}`}</span>
                        <Button data-type="btn-icon">
                            <Icon name="chart" />
                        </Button>
                        <span className="speed-destination">6 Mbps</span>
                    </div>
                ))}
                {ipbeDestinations?.map((item) => (
                    <div className="card-table-destination-holder">
                        <span key={item.id} className="text-small-blue">{`${item.outputIp}:${item.outputPort}`}</span>
                        <Button data-type="btn-icon">
                            <Icon name="chart" />
                        </Button>
                        <span className="speed-destination">6 Mbps</span>
                    </div>
                ))}
            </div>
            <div className="schema-row-holder">
                <NodeSchema nodeId={node} />
                {/* <NodeSchema nodeId={node} /> */}
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
