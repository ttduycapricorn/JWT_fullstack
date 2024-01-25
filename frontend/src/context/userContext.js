'use client';
import { useState, createContext, useEffect } from 'react';

import { getUserAccount } from '@/services/userService';

const UserContext = createContext(null);

function UserProvider({ children }) {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({
        isAuthenticated: false,
        token: '',
        account: {},
    });

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser(userData);
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };

    const fetchUser = async () => {
        let response = await getUserAccount();
        if (response && response.EC === 0) {
            let GroupWithRoles = response.DT.GroupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;
            let data = {
                isAuthenticated: true,
                token,
                account: { GroupWithRoles, email, username },
            };
            setUser(data);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return <UserContext.Provider value={{ user, loginContext, logout }}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
