'use client';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { menuItemsData } from './menuItemData';
import { UserContext } from '@/context/useContext';

import styles from './navbar.module.scss';

const cx = classNames.bind(styles);

function NavHeader() {
    const { user } = useContext(UserContext);
    const pathname = usePathname();
    return (
        <>
            {(user && user.isAuthenticated === true) || pathname === '/' ? (
                <div className={cx('wrapper')}>
                    <div className={cx('container-header')}>
                        <Link href={'/'}>
                            <img
                                className={cx('logo-header')}
                                src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
                            />
                        </Link>
                        <div className={cx('menus')}>
                            {menuItemsData.map((item, index) => {
                                return (
                                    <div className={cx('menu')} content={item.title} key={index}>
                                        <Link key={index} href={item.url} onClick={item.onclick}>
                                            {item.title}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default NavHeader;
