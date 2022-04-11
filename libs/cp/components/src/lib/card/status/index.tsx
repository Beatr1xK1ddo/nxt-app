import { FC, useMemo } from 'react';
import styles from './status.module.scss';
import { EStatusTypes, IStatusProps } from './types';

export const Status: FC<IStatusProps> = (props) => {
    const { status } = props;

    const title = useMemo(() => {
        switch (status) {
            case EStatusTypes.error:
                return 'Error';
            case EStatusTypes.active:
                return 'Active';
            case EStatusTypes.stopped:
                return 'Stopped';
            default:
                return '';
        }
    }, [status]);

    return (
        <span className={`${styles['card-status']} ${styles[status]}`}>
            {title}
        </span>
    );
};
