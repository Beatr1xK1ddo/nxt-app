import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { getLoadersRoot } from '@nxt-ui/cp/ducks';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import styles from './loader.module.scss';

export const LoaderContainer: FC = ({ children }) => {
    const { pageLoading } = useSelector(getLoadersRoot);

    return (
        <div className={styles['loader-container-root']}>
            <div
                className={`${styles['loader-wrap']} ${
                    pageLoading ? styles['active'] : ''
                }`}
            >
                <LinearProgress />
            </div>
            <div className={styles['loader-content-block']}>{children}</div>
            <div
                className={`${styles['loader-popup']} ${
                    pageLoading ? styles['active'] : ''
                }`}
            ></div>
        </div>
    );
};
