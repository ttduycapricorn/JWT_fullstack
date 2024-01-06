import Navigation from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
// import Footer from '@/components/layout/footer';

import './page.scss';

function Home() {
    return (
        <>
            <Navigation />
            <div className="container_main">
                <Sidebar />
                <h1>HOME PAGE!</h1>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Home;
