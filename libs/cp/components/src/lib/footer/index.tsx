import { FC } from 'react';
import styles from './footer.module.scss';

export const Footer: FC = () => (
    <footer className={styles['footer']}>
        <div className={styles['container']}>
            <p>&copy; Nextologies, 2022</p>
        </div>
    </footer>
);
