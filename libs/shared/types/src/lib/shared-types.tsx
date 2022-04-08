import styles from './shared-types.module.scss';

/* eslint-disable-next-line */
export interface SharedTypesProps {}

export function SharedTypes(props: SharedTypesProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to SharedTypes!</h1>
        </div>
    );
}

export default SharedTypes;
