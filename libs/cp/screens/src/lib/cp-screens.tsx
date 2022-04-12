import styles from './cp-screens.module.scss';

/* eslint-disable-next-line */
export interface CpScreensProps {}

export function CpScreens(props: CpScreensProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to CpScreens!</h1>
        </div>
    );
}

export default CpScreens;
