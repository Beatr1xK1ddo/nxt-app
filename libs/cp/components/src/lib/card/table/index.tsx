import { FC, useRef } from 'react';
import './cardtable.css';
import { CheckboxComponent } from '@nxt-ui/components';
import { CardTableInfo } from './info';
import { Status } from '../status';
import { Icon } from '@nxt-ui/icons';
import { IIbpeCard } from '@nxt-ui/cp/api';
import { v4 as uuidv4 } from 'uuid';

import img from '../img.png';

export const CardTable: FC<IIbpeCard> = (props) => {
    const {
        name,
        node_text,
        ipbe_destinations,
        video_format,
        ipbe_audio_channels,
        vbitrate,
        card_idx,
        status,
        thumbnail,
    } = props;

    const runRef = useRef<HTMLParagraphElement | null>(null);

    return (
        <li className="card-table">
            <div className="card-table-checkbox">
                <CheckboxComponent />
            </div>
            <div className="card-table-info">
                <CardTableInfo title={name} text={node_text} image={img} />
            </div>
            <div className="card-table-status">
                <Status status={status} />
                <Icon name="calendar" style={{ marginTop: 4 }} />
            </div>
            <div className="card-table-runtime">
                <span className="text-small">
                    {runRef.current || '2y 32d'}
                </span>
                <span className="text-small">
                    {runRef.current || '08h 41m'}
                </span>
            </div>
            <div className="card-table-input">
                <p className="text-small">
                    <span className="text-thin">{`IDX: `}</span>
                    {card_idx}
                </p>
                <p className="text-small">
                    <span className="text-thin">{`Format: `}</span>
                    {video_format}
                </p>
            </div>
            <div className="card-table-bitrate">
                <div className="scroll">
                    <span className="text-small">
                        {`${vbitrate}Mbps`}
                    </span>
                    {ipbe_audio_channels?.map((item) => (
                        <span
                            key={uuidv4()}
                            className="text-small"
                        >{`${item.abitrate}kbps ${item.type}`}</span>
                    ))}
                </div>
            </div>
            <div className="card-table-destination">
                {ipbe_destinations?.map((item) => (
                    <span key={uuidv4()} className="text-small-blue">
                        {`${item.output_ip}:${item.output_port}`}
                    </span>
                ))}
                <div className="block-icon">
                    <Icon name="plus" />
                </div>
            </div>
            <div className="card-table-actions">
                <div className="block-icon">
                    <Icon name="properties" />
                </div>
            </div>
        </li>
    );
};
