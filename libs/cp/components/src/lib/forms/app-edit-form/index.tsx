import styles from './app-edit.module.scss';
import { Main } from "./main/index";

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
            <div className={styles['form-tabs-container']}>qq all</div>
            <div className={styles['form-main-container']}>
                {Main}
            </div>
        </div>
    );
}
