import { FC } from 'react';
import styles from './filter.module.scss';
import { InputText, Dropdown, Button } from '@nxt-ui/components';
import { EColors } from '@nxt-ui/colors';
export const Filter: FC = () => {
    return (
        <div className={styles['filter-wrap']}>
            <div className={styles['filter-list']}>
                <InputText defaultProps={{ label: 'NAME' }} />
                <Dropdown label="NODE" />
                <Dropdown label="COMPANY" />
                <Dropdown label="STATUS" />
                <Dropdown label="TIMECODE" />
                <Dropdown label="ITEMS PER PAGE" />
            </div>
            <div className={styles['filter-block']}>
                <Button icon="filter" iconBefore>
                    Filter
                </Button>
                <Button
                    bgColor={EColors.grey}
                    style={{ color: EColors.black, marginLeft: 8 }}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};
