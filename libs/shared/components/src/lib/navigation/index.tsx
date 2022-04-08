import { FC, useMemo } from 'react';
import { NavTab } from './tab';
import { v4 as uuidv4 } from 'uuid';
import styles from './navigation.module.scss';
import { Icon } from '@nxt-ui/icons';
import { NavSearch } from './search';

export const Navigation: FC = () => {
    const labels = useMemo(
        () => [
            'Node',
            'Applications',
            'Projects',
            'Playout',
            'Satellite',
            'Monitoring',
        ],
        []
    );

    return (
        <header id={styles['header']}>
            <h1 className={styles['logo']}>
                <Icon name="logo" />
            </h1>
            <div className={styles['header-nav-holder']}>
                <nav id={styles['header-nav']}>
                    <ul>
                        {labels.map((label) => (
                            <NavTab key={uuidv4()} label={label} />
                        ))}
                    </ul>
                </nav>
                <NavSearch />
            </div>

            {/* move another component */}
            <ul className={styles['header-right-menu']}>
                <li>
                    <button className={styles['btn-icon']}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.88 14.12 16.19 12 18.88C9.92 16.21 7 11.85 7 9Z"
                                fill="currentColor"
                            />
                            <path
                                d="M14.5 9.5C14.5 10.8807 13.3807 12 12 12C10.6193 12 9.5 10.8807 9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5Z"
                                stroke="currentColor"
                                stroke-width="2"
                            />
                        </svg>
                    </button>
                    <ul className={styles['heading-menu']}>
                        <li>
                            <a href="">Item 1</a>
                        </li>
                        <li>
                            <a href="">Item 2</a>
                        </li>
                        <li>
                            <a href="">Item 3</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <button className={styles['btn-icon']}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                                fill="currentColor"
                            />
                            <path
                                d="M11.5 6V12.5L15.5 14.5"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                    <ul className={styles['heading-menu']}>
                        <li className={styles['time-zones']}>
                            Time zones
                            <button className={styles['btn-icon']}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM5.92 19H5V18.08L14.06 9.02L14.98 9.94L5.92 19ZM20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3C17.4 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <a href="">Item 1</a>
                        </li>
                        <li>
                            <a href="">Item 2</a>
                        </li>
                        <li>
                            <a href="">Item 3</a>
                        </li>
                    </ul>
                </li>

                <li className={`${styles['user-settings']} ${styles['reg']}`}>
                    <a className={styles['menu-link']} href="">
                        StevenQ
                        <div className={styles['btn-icon']}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.9167 8.59009L12.3267 13.1701L7.73666 8.59009L6.32666 10.0001L12.3267 16.0001L18.3267 10.0001L16.9167 8.59009Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </a>
                    <ul className={styles['heading-menu']}>
                        <li>
                            <a href="">Users list</a>
                        </li>
                        <li>
                            <a href="">Companies</a>
                        </li>
                        <li>
                            <a href="">AP clients</a>
                        </li>
                        <li>
                            <button id={styles['theme-toggle']}>
                                сменить тему
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </header>
    );
};
