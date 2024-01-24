'use client';
import { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

function UserPageLayout({ children }) {
    const [account, setAccount] = useState('');

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            setAccount(JSON.parse(session));
        }
    }, []);

    return (
        <>
            <div>
                {account && !_.isEmpty(account) && account.isAuthenticated && <Navbar />}
                {children}
                <Footer />
            </div>
        </>
    );
}

export default UserPageLayout;
