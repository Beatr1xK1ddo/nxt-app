import { FC } from 'react';
import { ILogTagProps } from './types';
import styles from './tag.module.scss';

export const LogTag: FC<ILogTagProps> = (props) => {
    const { name } = props;
    return (
        <li className={styles['log-tag']}>
            <a href="#">{`#${name}`}</a>
        </li>
    );
};
