import { FC, useRef } from 'react';
import styles from './cardtable.module.scss';
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
        nodeText,
        ipbeDestinations,
        inputFormat,
        ipbeAudioEncoders,
        vbitrate,
        status,
    } = props;

    const runRef = useRef<HTMLParagraphElement | null>(null);

    return (
        <li className={styles['card-table']}>
            <div className={styles['card-table-checkbox']}>
                <CheckboxComponent />
            </div>
            <div className={styles['card-table-info']}>
                <CardTableInfo title={name} text={nodeText} image={img} />
            </div>
            <div className={styles['card-table-status']}>
                <Status status={status} />
                <Icon name="calendar" style={{ marginTop: 4 }} />
            </div>
            <div className={styles['card-table-runtime']}>
                <span className="text-small">
                    {runRef.current || '2y 32d'}
                </span>
                <span className="text-small">
                    {runRef.current || '08h 41m'}
                </span>
            </div>
            <div className={styles['card-table-input']}>
                {/* <p className="text-small">
                    <span className="text-thin">{`IDX: `}</span>
                    {card_idx}
                </p> */}
                <p className="text-small">
                    <span className="text-thin">{`Format: `}</span>
                    {inputFormat}
                </p>
            </div>
            <div className={styles['card-table-bitrate']}>
                <div className={styles['scroll']}>
                    {vbitrate && (
                        <span className="text-small">
                            {`${vbitrate}Mbps`}
                        </span>
                    )}
                    {ipbeAudioEncoders?.map((item) => (
                        <span
                            key={uuidv4()}
                            className="text-small"
                        >{`${item.bitrate}kbps ${item.codec}`}</span>
                    ))}
                </div>
            </div>
            <div className={styles['card-table-destination']}>
                {ipbeDestinations?.map((item) => (
                    <span key={uuidv4()} className={styles['text-small-blue']}>
                        {`${item.outputIp}:${item.outputPort}`}
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
