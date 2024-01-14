import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './globals.scss';
// import Navbar from '@/components/layout/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                {children}
            </body>
        </html>
    );
}
