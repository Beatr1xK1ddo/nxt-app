import styles from './cp.module.scss';

/* eslint-disable-next-line */
export interface CpProps {}

export function Cp(props: CpProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to Cp!</h1>
        </div>
    );
}

export default Cp;
