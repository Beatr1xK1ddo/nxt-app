import { FC, useRef } from 'react';
import styles from './cardtable.module.scss';
import { CheckboxComponent } from '@nxt-ui/components';
import { CardTableInfo } from './info';
import { Status } from '../status';
import { Icon } from '@nxt-ui/icons';
import { IIbpeCard } from '@nxt-ui/cp/api';

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
        status
    } = props;

    const runRef = useRef<HTMLParagraphElement | null>(null);

    return (
        <li className={styles['card-table']}>
            <div className={styles['card-table-checkbox']}>
                <CheckboxComponent />
            </div>
            <div className={styles['card-table-info']}>
                <CardTableInfo title={name} text={node_text} image={img} />
            </div>
            <div className={styles['card-table-status']}>
                <Status status={status} />
                <Icon name="calendar" style={{ marginTop: 4 }} />
            </div>
            <div className={styles['card-table-runtime']}>
                <span className={styles['text-small']}>
                    {runRef.current || '2y 32d'}
                </span>
                <span className={styles['text-small']}>
                    {runRef.current || '08h 41m'}
                </span>
            </div>
            <div className={styles['card-table-input']}>
                <p className={styles['text-small']}>
                    <span className={styles['text-thin']}>{`IDX: `}</span>
                    {card_idx}
                </p>
                <p className={styles['text-small']}>
                    <span className={styles['text-thin']}>{`Format: `}</span>
                    {video_format}
                </p>
            </div>
            <div className={styles['card-table-bitrate']}>
                <div className={styles['scroll']}>
                    <span className={styles['text-small']}>
                        {`${vbitrate}Mbps`}
                    </span>
                    {ipbe_audio_channels?.map((item) => (
                        <span
                            className={styles['text-small']}
                        >{`${item.abitrate}kbps ${item.type}`}</span>
                    ))}
                </div>
            </div>
            <div className={styles['card-table-destination']}>
                {ipbe_destinations?.map((item) => (
                    <span className={styles['text-small-blue']}>
                        {`${item.output_ip}:${item.output_port}`}
                    </span>
                ))}
                <div className={styles['block-icon']}>
                    <Icon name="plus" />
                </div>
            </div>
            <div className={styles['card-table-actions']}>
                <div className={styles['block-icon']}>
                    <Icon name="properties" />
                </div>
            </div>
        </li>
    );
};
