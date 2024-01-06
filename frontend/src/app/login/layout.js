import navbar from '@/components/navbar';

function LayoutLoginPage({ children }) {
    return (
        <>
            <navbar />
            <main>{children}</main>
        </>
    );
}

export default LayoutLoginPage;
