import { FC } from 'react';
import { ILogTypeProps } from './types';
import styles from './logtype.module.scss';

export const LogType: FC<ILogTypeProps> = (props) => {
    const { type } = props;
    return (
        <span className={`${styles['log-type']} ${styles[type]}`}>
            &bull; {type}
        </span>
    );
};
