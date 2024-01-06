import Link from 'next/link';
import './navbar.scss';

function Navbar() {
    return (
        <ul>
            <li>
                <Link class="active" href="/">
                    Home
                </Link>
            </li>
            <li>
                <Link href="/login">Login</Link>
            </li>
            <li>
                <Link href="#contact">Contact</Link>
            </li>
            <li>
                <Link href="#about">About</Link>
            </li>
        </ul>
    );
}

export default Navbar;
