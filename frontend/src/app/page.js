import Sidebar from '@/components/layout/sidebar';

import './page.scss';
import Navbar from '@/components/layout/navbar/navbar';

function Home() {
    return (
        <>
            <div className="container_main">
                <Navbar />
                <div className="content">
                    <Sidebar />
                    <h1>HOME PAGE!</h1>
                </div>
            </div>
        </>
    );
}

export default Home;
