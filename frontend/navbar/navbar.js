import Link from 'next/link';

import './navbar.scss';

function Navbar() {
    return (
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/login">Login</Link>
            </li>
            <li>
                <Link href="contact.asp">Contact</Link>
            </li>
            <li>
                <Link href="about.asp">About</Link>
            </li>
        </ul>
    );
}

export default Navbar;
