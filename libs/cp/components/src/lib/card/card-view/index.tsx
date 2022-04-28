import { FC, useMemo, useRef, CSSProperties } from 'react';
import { Icon } from '@nxt-ui/icons';
import { AccordionComponent, CheckboxComponent } from '@nxt-ui/components';
import { Status } from '../status';
import { CardAccordionTitle } from './accordion-title';
import { IIbpeCard } from '@nxt-ui/cp/api';
import img from '../img.png';
import './cardview.css';

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
        <li className="card-wrap">
            <div className="card-block">
                <div className="card-left">
                    <CheckboxComponent />
                </div>
                <div className="card-right">
                    <h4 className="card-title">{name}</h4>
                </div>
            </div>

            <div className="card-block">
                <div className="card-left">
                    <div className="card-img" style={imageCss}></div>
                </div>
                <div className="card-right">
                    <p className="card-text">{node_text}</p>
                </div>
            </div>
            <div className="card-block">
                <div className="card-left">
                    <div className="card-status">
                        <div className="block-icon">
                            <Icon name="calendar" />
                        </div>
                        <Status status={status} />
                    </div>
                </div>
                <div className="card-right">
                    <ul className="card-table-list">
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
                            <div className="scroll">
                                <p className="text-small">{`${vbitrate}Mbps`}</p>
                                {ipbe_audio_channels?.map((item) => (
                                    <p className="text-small">{`${item.abitrate}kbps ${item.type}`}</p>
                                ))}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card-block">
                <div className="card-left"></div>
                <div className="card-right">
                    <div className="card-destination">
                        <div className="card-destination-wrap">
                            {ipbe_destinations?.map((item) => (
                                <span className="text-small-blue">
                                    {`${item.output_ip}:${item.output_port}`}
                                </span>
                            ))}
                        </div>
                        <div className="block-icon">
                            <Icon name="plus" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-block">
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

            <div className="card-block">
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

            <div className="card-block">
                <ul className="card-icon-list">
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
