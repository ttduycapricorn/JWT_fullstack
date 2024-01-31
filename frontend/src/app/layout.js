'use client';

import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { UserProvider } from '@/context/useContext';
import Footer from '@/components/layout/footer';
import Loading from './loading';

import './globals.scss';

// import Navbar from '@/components/layout/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <UserProvider>
                <body className={inter.className}>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover={false}
                        theme="dark"
                    />
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                    <Footer />
                </body>
            </UserProvider>
        </html>
    );
}
