import React, {useCallback, useRef, useState} from "react";
import {EAppGeneralStatus, IIpbeListItem, IIpbeListItemDestination} from "@nxt-ui/cp/types";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import Monitoring from "./Monitoring";
import {MenuComponent, MenuItemStyled} from "@nxt-ui/components";

type Props = {
    ipbe: IIpbeListItem;
    destination: IIpbeListItemDestination;
};

const Destination = ({ipbe, destination}: Props) => {
    const {status} = useRealtimeAppData(ipbe.node, "ipbe2", ipbe.id, ipbe.startedAtMs);

    const [open, setOpen] = useState<boolean>(false);

    const reference = useRef<HTMLDivElement>(null);

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
            <span
                ref={reference}
                className="text-small-blue"
                onClick={handleOpenMenu}>{`${destination.outputIp}:${destination.outputPort}`}</span>
            {(status === EAppGeneralStatus.active || status === EAppGeneralStatus.error) && (
                <Monitoring nodeId={ipbe.node} appId={ipbe.id} destination={destination} />
            )}
        </div>
    );
};

export default Destination;
