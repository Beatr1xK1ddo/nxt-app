import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { getLoadersRoot } from '@nxt-ui/cp/ducks';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import './loader.css';

export const LoaderContainer: FC = ({ children }) => {
    const { pageLoading } = useSelector(getLoadersRoot);

    return (
        <div className="loader-container-root">
            <div className={`loader-wrap ${pageLoading ? 'active' : ''}`}>
                <LinearProgress />
            </div>
            <div className="loader-content-block">{children}</div>
            <div
                className={`loader-popup ${pageLoading ? 'active' : ''}`}
            ></div>
        </div>
    );
};
