'use client';
import Navbar from '@/components/layout/navbar';

function UserPageLayout({ children }) {
    return (
        <>
            <div>
                <Navbar />
                {children}
            </div>
        </>
    );
}

export default UserPageLayout;
