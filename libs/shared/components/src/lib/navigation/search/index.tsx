import { FC } from 'react';
import styles from './search.module.scss';

export const NavSearch: FC = () => {
    return (
        <div className={styles['search-holder']}>
            <input
                id="search-header"
                type="checkbox"
                className={styles['activate-search']}
            />
            <label htmlFor="search-header">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M16.9498 7.05025C17.3404 7.44078 17.3404 8.07394 16.9498 8.46447L13.4143 12L16.9498 15.5355C17.3404 15.9261 17.3404 16.5592 16.9498 16.9497C16.5593 17.3403 15.9261 17.3403 15.5356 16.9497L12.0001 13.4142L8.46455 16.9497C8.07402 17.3403 7.44086 17.3403 7.05033 16.9497C6.65981 16.5592 6.65981 15.9261 7.05033 15.5355L10.5859 12L7.05033 8.46447C6.65981 8.07394 6.65981 7.44078 7.05033 7.05025C7.44086 6.65973 8.07402 6.65973 8.46455 7.05025L12.0001 10.5858L15.5356 7.05025C15.9261 6.65973 16.5593 6.65973 16.9498 7.05025Z"
                        fill="#323232"
                    />
                </svg>
            </label>
            <form action="#">
                <input
                    className={`${styles['search']} ${styles['input']}`}
                    type="text"
                    name=""
                    id=""
                    placeholder="Search"
                />
                <button type="submit" className={styles['btn-icon']}>
                    <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.8267 13.5L19.3267 19"
                            stroke="#5E6366"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.82666 16C13.4165 16 16.3267 13.0899 16.3267 9.5C16.3267 5.91015 13.4165 3 9.82666 3C6.23681 3 3.32666 5.91015 3.32666 9.5C3.32666 13.0899 6.23681 16 9.82666 16ZM9.82666 14C12.3119 14 14.3267 11.9853 14.3267 9.5C14.3267 7.01472 12.3119 5 9.82666 5C7.34138 5 5.32666 7.01472 5.32666 9.5C5.32666 11.9853 7.34138 14 9.82666 14Z"
                            fill="#5E6366"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
};
