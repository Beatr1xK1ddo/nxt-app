import styles from './app-edit.module.scss';

const tabs = [
    'main',
    'video encoder',
    'audio encoder',
    'mpeg-ts muxer',
    'rtp muxer',
    'advanced',
];

export function AppEditForm() {
    return (
        <div className={styles['form-container']}>
            <div className={styles['form-tabs-container']}></div>
            <div className={styles['form-main-container']}>
                some text
            </div>
        </div>
    );
}
