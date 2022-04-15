import { FC, useCallback } from 'react';
import styles from './controller.module.scss';
import { Dropdown, Button } from '@nxt-ui/components';
import { EColors } from '@nxt-ui/colors';
import { Icon } from '@nxt-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeCardView, getCardViewMode } from '@nxt-ui/cp/ducks';
import { ECardView } from '@nxt-ui/cp/types';
import { IControllerProps } from './types';

export const Controller: FC<IControllerProps> = (props) => {
    const { start, end, total } = props;
    const dispatch = useDispatch();

    const { mode } = useSelector(getCardViewMode);

    const changeView = useCallback(
        (mode: ECardView) => () => {
            dispatch(changeCardView(mode));
        },
        []
    );

    return (
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
                <p>{`Showing ${start} to ${
                    !total ? 'Loading...' : total < end ? total : end
                } from ${total ?? 'Loading...'}. View as:`}</p>
                <div className={styles['controller-right-icons']}>
                    <div
                        className={`${styles['block-icon']} ${
                            mode === ECardView.table ? styles['active'] : ''
                        }`}
                        onClick={changeView(ECardView.table)}
                    >
                        <Icon name="burger" />
                    </div>
                    <div
                        className={`${styles['block-icon']} ${
                            mode === ECardView.card ? styles['active'] : ''
                        }`}
                        onClick={changeView(ECardView.card)}
                    >
                        <Icon name="card" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controller;
