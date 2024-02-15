'use client';
import { ColorRing } from 'react-loader-spinner';
import { useContext } from 'react';
import { UserContext } from '@/context/useContext';

import './page.scss';

export default function Loading() {
    const { user } = useContext(UserContext);
    // You can add any UI inside Loading, including a Skeleton.
    new Promise((resolve) => setTimeout(resolve, 2000));
    return (
        <>
            {user && user.isLoading ? (
                <div className="loading-container">
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                    <div>Loading... (please waiting :))))</div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
