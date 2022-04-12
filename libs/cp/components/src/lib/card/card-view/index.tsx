import { FC, useMemo } from 'react';
import styles from './cardview.module.scss';
import { ICardViewProps } from '../types';
import { Icon } from '@nxt-ui/icons';
import { AccordionComponent, CheckboxComponent } from '@nxt-ui/components';
import { Status } from '../status';
import { CardAccordionTitle } from './accordion-title';

export const CardView: FC<ICardViewProps> = (props) => {
    const {
        info,
        status,
        runtime,
        input: { idx, format },
        bitrate: { mbps, kbps },
        destination,
        performance,
        media,
    } = props;

    const imageCss = useMemo(
        () => ({
            backgroundImage: `url(${info.image})`,
        }),
        [info.image]
    );

    return (
        <div className={styles['card-wrap']}>
            <div className={styles['card-block']}>
                <div className={styles['card-left']}>
                    <CheckboxComponent />
                </div>
                <div className={styles['card-right']}>
                    <h4 className={styles['card-title']}>{info.title}</h4>
                </div>
            </div>

            <div className={styles['card-block']}>
                <div className={styles['card-left']}>
                    <div className={styles['card-img']} style={imageCss}></div>
                </div>
                <div className={styles['card-right']}>
                    <p className={styles['card-text']}>{info.text}</p>
                </div>
            </div>

            <div className={styles['card-block']}>
                <div className={styles['card-left']}>
                    <div className={styles['card-status']}>
                        <div className={styles['block-icon']}>
                            <Icon name="calendar" />
                        </div>
                        <Status {...status} />
                    </div>
                </div>
                <div className={styles['card-right']}>
                    <div className={styles['card-table']}>
                        <div className={styles['card-row']}>
                            <p className={styles['text-small']}>{runtime}</p>
                            <p className={styles['text-small']}>{runtime}</p>
                        </div>
                        <div className={styles['card-row']}>
                            <span className={styles['text-thin']}>IDX:</span>
                            <p className={styles['text-small']}>{idx}</p>
                        </div>
                        <div className={styles['card-row']}>
                            <span className={styles['text-thin']}>Format:</span>
                            <p className={styles['text-small']}>{format}</p>
                        </div>
                        <div className={styles['card-row']}>
                            <p className={styles['text-small']}>{mbps}</p>
                            <p className={styles['text-small']}>{kbps}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['card-block']}>
                <div className={styles['card-left']}></div>
                <div className={styles['card-right']}>
                    <div className={styles['card-destination']}>
                        <div>
                            <span className={styles['text-small-blue']}>
                                {destination}
                            </span>
                        </div>
                        <div className={styles['block-icon']}>
                            <Icon name="plus" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['card-block']}>
                <AccordionComponent
                    style={{
                        background: 'transparent',
                        '.MuiButtonBase-root': {
                            padding: 0,
                            minHeight: 0,
                            '.MuiAccordionSummary-expandIconWrapper': {
                                marginRight: '1px',
                            },
                        },
                    }}
                    header={<CardAccordionTitle {...performance} />}
                    content={<h2>qq</h2>}
                />
            </div>

            <div className={styles['card-block']}>
                <AccordionComponent
                    style={{
                        background: 'transparent',
                        '.MuiButtonBase-root': {
                            padding: 0,
                            minHeight: 0,
                            '.MuiAccordionSummary-expandIconWrapper': {
                                marginRight: '1px',
                            },
                        },
                    }}
                    header={<CardAccordionTitle {...media} />}
                    content={<h2>qq</h2>}
                />
            </div>

            <div className={styles['card-block']}>
                <div className={styles['card-left']}>
                    <div className={styles['card-icon-block']}>
                        <div className={styles['block-icon']}>
                            <Icon name="pause" />
                        </div>
                        <div className={styles['block-icon']}>
                            <Icon name="arrows" />
                        </div>
                        <div className={styles['block-icon']}>
                            <Icon name="copy" />
                        </div>
                        <div className={styles['block-icon']}>
                            <Icon name="save" />
                        </div>
                    </div>
                </div>
                <div className={styles['card-right']}>
                    <div className={styles['block-icon']}>
                        <Icon name="properties" />
                    </div>
                </div>
            </div>
        </div>
    );
};
