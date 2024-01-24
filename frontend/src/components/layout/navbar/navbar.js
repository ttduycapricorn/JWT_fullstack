'use client';
import Link from 'next/link';

import { menuItemsData } from './menuItemData';
import './navbar.scss';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link href="/" className="navbar-brand">
                        Brand
                    </Link>
                    <button
                        type="button"
                        className="navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav">
                            {
                                <div className="menus">
                                    {menuItemsData.map((menu, index) => {
                                        return (
                                            <div content={menu.title} key={index}>
                                                <Link className="nav-item nav-link" href={menu.url} key={index}>
                                                    {menu.title}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            }
                        </div>
                        <div className="navbar-nav ms-auto">
                            <Link href="/login" className="nav-item nav-link">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
