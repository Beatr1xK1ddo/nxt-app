import styles from './cp-api.module.scss';

/* eslint-disable-next-line */
export interface CpApiProps {}

export function CpApi(props: CpApiProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to CpApi!</h1>
        </div>
    );
}

export default CpApi;
