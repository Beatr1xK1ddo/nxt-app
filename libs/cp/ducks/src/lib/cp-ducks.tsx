import styles from './cp-ducks.module.scss';

/* eslint-disable-next-line */
export interface CpDucksProps {}

export function CpDucks(props: CpDucksProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to CpDucks!</h1>
        </div>
    );
}

export default CpDucks;
