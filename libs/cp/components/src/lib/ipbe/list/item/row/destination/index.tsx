import React, {useCallback, useMemo, useRef, useState} from "react";
import {EAppGeneralStatus, EAppType, IIpbeListItem, IListItemDestination} from "@nxt-ui/cp/types";
import {useRealtimeAppData, useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import Monitoring from "./Monitoring";
import {MenuComponent, MenuItemStyled} from "@nxt-ui/components";

type Props = {
    ipbe: IIpbeListItem;
    destination: IListItemDestination;
};

const Destination = ({ipbe, destination}: Props) => {
    const {status} = useRealtimeAppData(ipbe, ipbe.nodeId);
    const {initial, monitoring} = useRealtimeMonitoring(ipbe.nodeId, EAppType.IPBE, ipbe.id);

    const reference = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(false);

    const handleOpenMenu = useCallback(() => {
        setOpen(true);
    }, []);

    const handleCloseMenu = useCallback(() => {
        setOpen(false);
    }, []);

    const handleSearchIp = useCallback(() => {
        setOpen(false);
    }, []);
    const handleWatchIp = useCallback(() => {
        setOpen(false);
    }, []);
    const handleAnalyzeIp = useCallback(() => {
        setOpen(false);
    }, []);

    const currentBitrate = useMemo(() => {
        if (monitoring) return monitoring.bitrate;
        return initial?.[0] ? initial?.[0].monitoring.bitrate : "";
    }, [initial, monitoring]);

    return (
        <div className="card-table-destination-holder" style={{cursor: "pointer"}}>
            <MenuComponent
                anchorEl={reference?.current}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                className="test">
                <MenuItemStyled onClick={handleSearchIp}>Search this IP</MenuItemStyled>
                <MenuItemStyled onClick={handleWatchIp}>Watch this IP</MenuItemStyled>
                <MenuItemStyled onClick={handleAnalyzeIp}>Analyze this IP</MenuItemStyled>
            </MenuComponent>
            <div className="card-table-destination-holder">
                <span className="text-small-blue" ref={reference} onClick={handleOpenMenu}>
                    {`${destination.outputIp}:${destination.outputPort}`}
                </span>{" "}
                {/* <span className="destination-bitrate">{`${currentBitrate}`}</span> */}
            </div>
            {(status === EAppGeneralStatus.active || status === EAppGeneralStatus.error) && (
                <>
                    /&nbsp;
                    <Monitoring nodeId={ipbe.nodeId} destination={destination} />
                </>
            )}
        </div>
    );
};

export default Destination;
