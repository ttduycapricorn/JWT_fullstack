import Link from 'next/link';

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
                            <Link href="/" className="nav-item nav-link active">
                                Home
                            </Link>
                            <Link href="#" className="nav-item nav-link">
                                Profile
                            </Link>
                            <Link href="#" className="nav-item nav-link">
                                Messages
                            </Link>
                            <Link href="#" className="nav-item nav-link disabled" tabIndex="-1">
                                Reports
                            </Link>
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
