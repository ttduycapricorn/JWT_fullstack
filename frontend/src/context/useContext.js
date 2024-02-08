'use client';
import { useState, createContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { getUserAccount } from '@/services/userService';

const UserContext = createContext(null);

function UserProvider({ children }) {
    const defaultData = {
        isLoading: true,
        isAuthenticated: false,
        token: '',
        account: {},
    };

    const pathName = usePathname();

    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(defaultData);

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({ ...userData, isLoading: false });
    };

    const fetchUser = async () => {
        let response = await getUserAccount();
        console.log(response);
        if (response && response.EC === 0) {
            let GroupWithRoles = response.DT.GroupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;
            let data = {
                isAuthenticated: true,
                token,
                account: { GroupWithRoles, email, username },
                isLoading: false,
            };

            console.log(data);
            setUser(data);
        } else {
            setUser({ ...defaultData, isLoading: false });
        }
    };

    useEffect(() => {
        if (pathName !== '/' && window.location.pathname !== '/login') {
            // window.location.href = '/login';
            fetchUser();
        } else {
            setUser({ ...user, isLoading: false });
        }
    }, []);

    return <UserContext.Provider value={{ user, loginContext, logoutContext }}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
