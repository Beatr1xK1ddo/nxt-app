import {useCallback, useRef, useState} from "react";
import {EAppGeneralStatus, IIpbeListItem, IListItemDestination} from "@nxt-ui/cp/types";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import Monitoring from "./Monitoring";
import {MenuComponent, MenuItemStyled} from "@nxt-ui/components";

type Props = {
    ipbe: IIpbeListItem;
    destination: IListItemDestination;
};

const Destination = ({ipbe, destination}: Props) => {
    const {status} = useRealtimeAppData(ipbe, ipbe.nodeId);

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
            <span className="text-small-blue" ref={reference} onClick={handleOpenMenu}>
                {`${destination.outputIp}:${destination.outputPort}`}
            </span>
            {(status === EAppGeneralStatus.active || status === EAppGeneralStatus.error) && (
                <>
                    /&nbsp;
                    <Monitoring app={ipbe} appId={ipbe.id} nodeId={ipbe.nodeId} destination={destination} />
                </>
            )}
        </div>
    );
};

export default Destination;
