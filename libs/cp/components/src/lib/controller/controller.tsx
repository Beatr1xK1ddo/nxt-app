import styles from './controller.module.scss';

/* eslint-disable-next-line */
export interface ControllerProps {}

export function Controller(props: ControllerProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to Controller!</h1>
        </div>
    );
}

export default Controller;
