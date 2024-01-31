import Navbar from '@/components/layout/navbar';

function LayoutLoginPage({ children }) {
    return (
        <>
            <main>
                <Navbar />
                {children}
            </main>
        </>
    );
}

export default LayoutLoginPage;
