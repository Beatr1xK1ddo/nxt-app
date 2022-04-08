import styles from './card.module.scss';
import { Grid } from './grid';
import { Grid2 } from './grid2';
import { Grid3 } from './grid3';
import { Grid4 } from './grid4';
import { DropMenu } from './drop-menu';
import img from '../../assets/images/img01-small.png';
import { EStatusTypes } from './grid4/types';
import { Grid5 } from './grid5';
import { Grid6 } from './grid6';
import { Icon } from '@nxt-ui/icons';

export const Card = () => {
    return (
        <div className={styles['card']}>
            <div className={styles['grid-card']}>
                <Grid />
                <Grid2 image={img} />
                <Grid3 text="Onboarding Process ** TIMES Network INDIA Secondary (smc-ubuntu20-server2) - X837256" />
                <Grid4 status={EStatusTypes.error} />
                <Grid5 />
                <Grid6 ip="239.0.0.4.1234" />
                <div className={styles['grid7']}>
                    <section className={styles['card-info']}>
                        <div className={styles['card-info-holder']}>
                            <h3>Perfomance chart</h3>
                            <p>239.5.171.8:1234 - Mbps / Time</p>
                            <div className={styles['btn-icon']}>
                                <Icon name="arrow" style={{transform: 'rotateX(180deg)'}} />
                            </div>
                        </div>
                        <div className={styles['hidden']}>
                            <div className={styles['img-holder']}>
                                <picture>
                                    <source
                                        srcSet="images/webp/img01-big.webp"
                                        type="image/webp"
                                    />
                                    <img
                                        src="images/img01-big.png"
                                        alt="Изображение"
                                    />
                                </picture>
                            </div>
                        </div>
                    </section>

                    <section className={styles['card-info']}>
                        <div className={styles['card-info-holder']}>
                            <h3>Media view</h3>
                            <p>2021/12/15 07:31:46</p>
                            <div className={styles['btn-icon']}>
                                <Icon name="arrow"  style={{transform: 'rotateX(180deg)'}} />
                            </div>
                        </div>
                        <div className={styles['hidden']}>
                            <ul className={styles['tabs']}>
                                <li className={styles['active']}>
                                    <button>TX</button>
                                </li>
                                <li>
                                    <button>RX</button>
                                </li>
                            </ul>
                            <div className={styles['img-holder tab-content']}>
                                <picture>
                                    <source
                                        srcSet="images/webp/img02-big.webp"
                                        type="image/webp"
                                    />
                                    <img
                                        src="images/img02-big.png"
                                        alt="Изображение"
                                    />
                                </picture>
                            </div>
                        </div>
                    </section>

                    <footer>
                        <ul className={styles['card-action-list']}>
                            <li>
                                <button className={styles['btn-icon']}>
                                    <Icon name="pause" />
                                </button>
                            </li>
                            <li>
                                <button className={styles['btn-icon']}>
                                <Icon name="arrows" />
                                </button>
                            </li>
                            <li>
                                <button className={styles['btn-icon']}>
                                <Icon name="copy" />
                                </button>
                            </li>
                            <li>
                                <button className={styles['btn-icon']}>
                                    <Icon name="save" />
                                </button>
                            </li>
                        </ul>
                        <DropMenu />
                    </footer>
                </div>
            </div>
        </div>
    );
};
