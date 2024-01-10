import Navigation from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';

import './page.scss';

function Home() {
    return (
        <>
            <Navigation />
            <div className="container_main">
                <Sidebar />
                <h1>HOME PAGE!</h1>
            </div>
        </>
    );
}

export default Home;
