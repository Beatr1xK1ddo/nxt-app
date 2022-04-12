import { FC } from 'react';
import styles from './cardtable.module.scss';
import { CheckboxComponent } from '@nxt-ui/components';
import { CardTableInfo } from './info';
import { ICardTableProps } from '../types';
import { Status } from '../status';
import { Icon } from '@nxt-ui/icons';

export const CardTable: FC<ICardTableProps> = (props) => {
    const {
        info,
        status,
        runtime,
        input: { idx, format },
        bitrate: { mbps, kbps },
        destination,
    } = props;

    return (
        <div className={styles['card-table']}>
            <div className={styles['card-table-checkbox']}>
                <CheckboxComponent />
            </div>
            <div className={styles['card-table-info']}>
                <CardTableInfo {...info} />
            </div>
            <div className={styles['card-table-status']}>
                <Status {...status} />
                <Icon name="calendar" style={{ marginTop: 8 }} />
            </div>
            <div className={styles['card-table-runtime']}>
                <span className={styles['text-small']}>{runtime}</span>
                <span className={styles['text-small']}>{runtime}</span>
            </div>
            <div className={styles['card-table-input']}>
                <p className={styles['text-small']}>
                    <span className={styles['text-thin']}>{`IDX: `}</span>
                    {idx}
                </p>
                <p className={styles['text-small']}>
                    <span className={styles['text-thin']}>{`Format: `}</span>
                    {format}
                </p>
            </div>
            <div className={styles['card-table-bitrate']}>
                <span className={styles['text-small']}>{mbps}</span>
                <span className={styles['text-small']}>{kbps}</span>
            </div>
            <div className={styles['card-table-destination']}>
                <span className={styles['text-small-blue']}>{destination}</span>
                <div className={styles['block-icon']}>
                    <Icon name="plus" />
                </div>
            </div>
            <div className={styles['card-table-actions']}>
                <div className={styles['block-icon']}>
                    <Icon name="properties" />
                </div>
            </div>
        </div>
    );
};
