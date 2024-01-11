'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function UserPage() {
    const router = useRouter();

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            router.push('/');
        }
    }, []);

    useEffect(() => {
        axios.get('').then();
    }, []);
    return (
        <>
            <h1>User page!</h1>
        </>
    );
}

export default UserPage;
