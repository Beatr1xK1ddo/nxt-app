import {FC, useMemo, useState} from "react";
import {formatDistance} from "date-fns";

import {
    CheckboxComponent,
    Button,
    CircularProgressWithLabel,
    InputText,
    Dropdown,
    RadioButtonsStyled,
    DatePicker,
    ModalComponent,
} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {Caption} from "./caption";
import {NodeStatus, NodeSchema, EventBox, FlexHolder} from "../../../../common";

import "./index.css";

import {EAppGeneralStatus, IIpbeListItem} from "@nxt-ui/cp/types";

interface IpbeListItemProps {
    item: IIpbeListItem;
    status: EAppGeneralStatus;
    startedAt: null | number;
}

export const IpbeRowItem: FC<IpbeListItemProps> = ({item, status, startedAt}) => {
    const {name, node, ipbeDestinations, inputFormat, ipbeAudioEncoders, videoBitrate, cardIdx} = item;

    const runTime = useMemo(() => {
        if (status === EAppGeneralStatus.active && startedAt) {
            return formatDistance(startedAt, new Date(), {addSuffix: false});
        } else {
            return "-";
        }
    }, [status, startedAt]);

    const inputsNodeScheme = [
        {id: 1, portAlert: "Signal good", content: <Icon name="input" />},
        {id: 2, portAlert: "Signal good", content: <Icon name="input" />},
        {id: 3, portAlert: "Signal good", content: <Icon name="input" />},
        {id: 4, portAlert: "Signal good", content: <Icon name="input" />},
        {id: 5, portAlert: "Signal good", content: <Icon name="input" />},
        {id: 6, portAlert: "Signal good", content: <Icon name="input" />},
    ];

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [date, setDate] = useState<Date | null>(new Date());
    const radioDate = [
        {id: 1, value: "date", label: "Date"},
        {id: 2, value: "period", label: "Period"},
    ];
    const radioTime = [
        {id: 1, value: "time", label: "Exact time, AT"},
        {id: 2, value: "interval", label: "Interval, EVERY"},
    ];

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
                <Button data-type="btn-icon" onClick={handleOpen}>
                    <Icon name="calendar" />
                </Button>
                <ModalComponent
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <EventBox btnFooter heading="AWE_from_Herring_PAL, events list">
                        <FlexHolder className="period-box">
                            <RadioButtonsStyled
                                defaultValue="date"
                                name="radioDate"
                                aria-labelledby="buttons-group"
                                radioArr={radioDate}
                            />
                            <DatePicker date={date} onChange={(newDate) => setDate(newDate)} />
                        </FlexHolder>

                        <RadioButtonsStyled
                            defaultValue="time"
                            name="radioTime"
                            aria-labelledby="buttons-group"
                            radioArr={radioTime}
                            row={true}
                        />

                        <FlexHolder className="element-row">
                            <InputText label="SET TIME" />
                            <Dropdown label="TIME ZONE" />
                        </FlexHolder>
                        <FlexHolder className="element-row">
                            <Dropdown label="ACTION" />
                            <Button>Create event</Button>
                            <Button data-type="btn-gray">Cancel</Button>
                        </FlexHolder>
                    </EventBox>
                </ModalComponent>
            </div>
            <div className="card-table-runtime">
                <span className="text-small">{runTime}</span>
                {/*<span className="text-small">{runRef.current || "08h 41m"}</span>*/}
            </div>
            <div className="card-table-input">
                <p className="text-small">
                    <span className="text-thin">{`IDX: `}</span>
                    {cardIdx}
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
                <div className="card-table-destination-holder">
                    <div className="destination-wrap">
                        {ipbeDestinations?.map((item) => (
                            <span
                                key={item.id}
                                className="text-small-blue">{`${item.outputIp}:${item.outputPort}`}</span>
                        ))}
                    </div>
                    <Button data-type="btn-icon">
                        <Icon name="chart" />
                    </Button>
                    <span className="speed-destination">6 Mbps</span>
                </div>
                <div className="card-table-destination-holder">
                    <div className="destination-wrap">
                        {ipbeDestinations?.map((item) => (
                            <span
                                key={item.id}
                                className="text-small-blue">{`${item.outputIp}:${item.outputPort}`}</span>
                        ))}
                    </div>
                    <Button data-type="btn-icon">
                        <Icon name="chart" />
                    </Button>
                    <span className="speed-destination">6 Mbps</span>
                </div>
            </div>
            <div className="schema-row-holder">
                <NodeSchema inputsImgs={inputsNodeScheme} />
                <NodeSchema inputsImgs={inputsNodeScheme} />
            </div>

            <div className="card-table-actions">
                <Button data-type="btn-icon">
                    <Icon name="properties" />
                </Button>
            </div>
        </li>
    );
};
