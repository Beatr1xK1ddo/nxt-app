import styles from './shared-fonts.module.scss';

/* eslint-disable-next-line */
export interface SharedFontsProps {}

export function SharedFonts(props: SharedFontsProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to SharedFonts!</h1>
        </div>
    );
}

export default SharedFonts;
