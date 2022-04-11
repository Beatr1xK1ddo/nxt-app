import { FC } from 'react';
import MenuItem from '@mui/material/MenuItem';
import styles from './droplist.module.scss';
import { IDropListProps } from '../types';
import { InputText } from '../../text';

export const DropList: FC<IDropListProps> = (props) => {
    const { values } = props;

    return (
        <div className={styles['drop-list']}>
            <div className={styles['drop-list-search']}>
                <InputText icon='search'/>
            </div>
            <ul className={styles['drop-list-wrap']}>
                {values?.map((name) => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                ))}
            </ul>
        </div>
    )
}
