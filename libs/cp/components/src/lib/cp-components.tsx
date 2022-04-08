import styles from './cp-components.module.scss';

/* eslint-disable-next-line */
export interface CpComponentsProps {}

export function CpComponents(props: CpComponentsProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to CpComponents!</h1>
        </div>
    );
}

export default CpComponents;
