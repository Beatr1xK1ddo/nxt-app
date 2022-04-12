import { FC } from 'react';
import styles from './controller.module.scss';
import { Dropdown, Button } from '@nxt-ui/components';
import { EColors } from '@nxt-ui/colors';
import { IControllerProps } from './types';
import { Icon } from '@nxt-ui/icons';

export const Controller: FC<IControllerProps> = (props) => {
    const { from, to, len } = props;
    return (
        <div className={styles['container']}>
            <div className={styles['controller-wrap']}>
                <div className={styles['controller-left']}>
                    <Button
                        bgColor={EColors.green}
                        icon="plus"
                        style={{ marginRight: 8 }}
                        iconBefore
                    >
                        Add new
                    </Button>
                    <Dropdown label="CHOOSE ACTION" inputWidth={210} />
                </div>
                <div className={styles['controller-right']}>
                    <p>{`Showing ${from} to ${to} of ${len} entries. View as:`}</p>
                    <div className={styles['controller-right-icons']}>
                        <div className={styles['block-icon']}>
                            <Icon name="burger" />
                        </div>
                        <div className={styles['block-icon']}>
                            <Icon name="card" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controller;
