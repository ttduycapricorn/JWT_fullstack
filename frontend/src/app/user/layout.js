'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

function UserPageLayout({ children }) {
    return (
        <>
            <div>
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    );
}

export default UserPageLayout;
