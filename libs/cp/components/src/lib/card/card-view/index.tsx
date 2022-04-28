import { FC, useMemo, useRef, CSSProperties } from 'react';
import styles from './cardview.module.scss';
import { Icon } from '@nxt-ui/icons';
import { AccordionComponent, CheckboxComponent } from '@nxt-ui/components';
import { Status } from '../status';
import { CardAccordionTitle } from './accordion-title';
import { IIbpeCard } from '@nxt-ui/cp/api';
import img from '../img.png';
import { EColors } from '@nxt-ui/colors';

const accordionProps = {
    title: 'Perfomance chart',
    paragraph: '239.5.171.8:1234 - Mbps / Time',
};

export const CardView: FC<IIbpeCard> = (props) => {
    const {
        name,
        node_text,
        ipbe_destinations,
        video_format,
        vbitrate,
        ipbe_audio_channels,
        card_idx,
        status,
        thumbnail,
    } = props;

    const imageCss = useMemo(
        () => ({
            backgroundImage: `url(${img})`,
        }),
        []
    );

    const thumbnailElement = useMemo(() => {
        const bgStyle: CSSProperties = {
            backgroundImage: `url(${thumbnail})`,
            width: '100%',
            height: '150px',
        };

        return <div style={bgStyle}></div>;
    }, [thumbnail]);

    const runRef = useRef<HTMLParagraphElement | null>(null);

    return (
        <li className={styles['card-wrap']}>
            <div className={styles['card-block']}>
                <div className={styles['card-left']}>
                    <CheckboxComponent />
                </div>
                <div className={styles['card-right']}>
                    <h4 className={styles['card-title']}>{name}</h4>
                </div>
            </div>

            <div className={styles['card-block']}>
                <div className={styles['card-left']}>
                    <div className={styles['card-img']} style={imageCss}></div>
                </div>
                <div className={styles['card-right']}>
                    <p className={styles['card-text']}>{node_text}</p>
                </div>
            </div>
            <div className={styles['card-block']}>
                <div className={styles['card-left']}>
                    <div className={styles['card-status']}>
                        <div className={styles['block-icon']}>
                            <Icon name="calendar" />
                        </div>
                        <Status status={status} />
                    </div>
                </div>
                <div className={styles['card-right']}>
                    <ul className={styles['card-table-list']}>
                        <li>
                            <p className="text-small">
                                {runRef.current || '2y 32d'}
                            </p>
                            <p className="text-small">
                                {runRef.current || '08h 41m'}
                            </p>
                        </li>
                        <li>
                            <span className="text-thin">IDX:</span>
                            <p className="text-small">{card_idx}</p>
                        </li>
                        <li>
                            <span className="text-thin">Format:</span>
                            <p className="text-small">{video_format}</p>
                        </li>
                        <li>
                            <div className={styles['scroll']}>
                                <p className="text-small">{`${vbitrate}Mbps`}</p>
                                {ipbe_audio_channels?.map((item) => (
                                    <p className="text-small">{`${item.abitrate}kbps ${item.type}`}</p>
                                ))}
                            </div>
                        </li>
                    </ul>
                    {/* <div className={styles['card-table']}>
                        <div className={styles['card-row']}>
                            <p className={styles['text-small']}>
                                {runRef.current || '2y 32d'}
                            </p>
                            <p className={styles['text-small']}>
                                {runRef.current || '08h 41m'}
                            </p>
                        </div>
                        <div className={styles['card-row']}>
                            <span className={styles['text-thin']}>IDX:</span>
                            <p className={styles['text-small']}>{card_idx}</p>
                        </div>
                        <div className={styles['card-row']}>
                            <span className={styles['text-thin']}>Format:</span>
                            <p className={styles['text-small']}>
                                {video_format}
                            </p>
                        </div>
                        <div className={styles['card-row']}>
                            <div className={styles['scroll']}>
                                <p
                                    className={styles['text-small']}
                                >{`${vbitrate}Mbps`}</p>
                                {ipbe_audio_channels?.map((item) => (
                                    <p
                                        className={styles['text-small']}
                                    >{`${item.abitrate}kbps ${item.type}`}</p>
                                ))}
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className={styles['card-block']}>
                <div className={styles['card-left']}></div>
                <div className={styles['card-right']}>
                    <div className={styles['card-destination']}>
                        <div className={styles['card-destination']}>
                            {ipbe_destinations?.map((item) => (
                                <span className={styles['text-small-blue']}>
                                    {`${item.output_ip}:${item.output_port}`}
                                </span>
                            ))}
                        </div>
                        <div className={styles['block-icon']}>
                            <Icon
                                name="plus"
                                style={{ fill: EColors.greyMain }}
                            />
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
                    header={<CardAccordionTitle {...accordionProps} />}
                    content={thumbnailElement}
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
                    header={<CardAccordionTitle {...accordionProps} />}
                    content={<h2>qq</h2>}
                />
            </div>

            <div className={styles['card-block']}>
                <ul className={styles['card-icon-list']}>
                    <li>
                        <Icon name="pause" />
                    </li>
                    <li>
                        <Icon name="arrows" />
                    </li>
                    <li>
                        <Icon name="copy" />
                    </li>
                    <li>
                        <Icon name="save" />
                    </li>
                    <li>
                        <Icon name="properties" />
                    </li>
                </ul>
            </div>
        </li>
    );
};
