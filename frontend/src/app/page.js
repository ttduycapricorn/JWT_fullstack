import Sidebar from '@/components/layout/sidebar';

import './page.scss';

function Home() {
    return (
        <>
            <div className="container_main">
                <div className="content">
                    <Sidebar />
                    <h1>HOME PAGE!</h1>
                </div>
            </div>
        </>
    );
}

export default Home;
