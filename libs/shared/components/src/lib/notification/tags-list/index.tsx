import { FC } from 'react';
import { LogType } from '../log-type';
import { LogInfo } from '../log-info';
import { ILogsListProps } from './types';
import { ELogTypes } from '../log-type/types';

export const LogsList: FC<ILogsListProps> = (props) => {
    const { type, tags, text, date } = props;
    return (
        <li>
            <LogType type={type} />
            <LogInfo tags={tags} text={text} date={date} />
        </li>
    );
};
