import { Icon } from '@nxt-ui/icons';
import styles from './navigation.module.scss';
import { v4 as uuidv4 } from 'uuid';
import NavigationTab from './tab';
import { EColors } from '@nxt-ui/colors';
import { FC } from 'react';
import { INavigationProps } from './types';

export const Navigation: FC<INavigationProps> = (props) => {

    const { username } = props;

    const navElems = [
        'node',
        'applications',
        'projects',
        'playout',
        'satellite',
        'monitoring'
    ]

    return (
        <nav className={styles['nav']}>
            <div className={styles['nav-container']}>
                <div className={styles['nav-wrap']}>
                    <div className={styles['nav-logo']}>
                    <div className={styles['nav-icon']}>
                        <Icon name="logo" />
                    </div>
                    </div>
                    <ul className={styles['nav-navigation']}>
                        {navElems.map(item => <NavigationTab key={uuidv4()} name={item} />)}
                        <div className={styles['nav-icon']}>
                            <Icon 
                                name="search" 
                                width={23} 
                                height={23} 
                                style={{fill: EColors.greyMain}}  
                            />
                        </div>
                    </ul>
                    <div className={styles['nav-right-pannel']}>
                        <div className={styles['nav-icon']}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.99 10C14.47 10 10 14.48 10 20C10 25.52 14.47 30 19.99 30C25.52 30 30 25.52 30 20C30 14.48 25.52 10 19.99 10ZM20 28C15.58 28 12 24.42 12 20C12 15.58 15.58 12 20 12C24.42 12 28 15.58 28 20C28 24.42 24.42 28 20 28Z" fill="#5E6366"/>
                                <path d="M19.5 14V20.5L23.5 22.5" stroke="#5E6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> 
                        </div>
                        <div className={styles['nav-icon']}>
                            <Icon name='notify' />
                        </div>
                        <NavigationTab name={username}>
                            <span className={styles['nav-status']}></span>
                        </NavigationTab>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
