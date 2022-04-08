import { FC } from 'react';
import { LogTag } from '../tag';
import { ILogInfoProps } from './types';
import { v4 as uuidv4 } from 'uuid';
import styles from './loginfo.module.scss';

export const LogInfo: FC<ILogInfoProps> = (props) => {
    const { text, date, tags } = props;
    return (
        <>
            <em className={styles['date']}>{date}</em>
            <p className={styles['log-info-text']}>{text}</p>
            <ul className={styles['tags']}>
                {tags.map((name) => (
                    <LogTag key={uuidv4()} name={name} />
                ))}
            </ul>
        </>
    );
};
