import { FC } from 'react';
import styles from './grid2.module.scss';
import { IGrid2Props } from './types';

export const Grid2: FC<IGrid2Props> = (props) => {
    const { image } = props;
    return (
        <div className={styles['grid2']}>
            <picture>
                {/* <source
                    srcset="images/webp/img01-small.webp"
                    type="image/webp"
                /> */}
                <img src={image} alt="Изображение" />
            </picture>
        </div>
    );
};
