import { FC } from 'react';
import styles from './footer.module.scss';

export const Footer: FC = () => {
    return (
        <footer className={styles['footer']}>
            <p>&copy; Nextologies, 2022</p>
        </footer>
    );
};
