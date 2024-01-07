import Navbar from '@/components/layout/navbar';

function LayoutLoginPage({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
}

export default LayoutLoginPage;
