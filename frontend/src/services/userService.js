// import axios from 'axios';

import axios from '@/customize/axios';

const registerNewUser = (email, phone, username, password) => {
    return axios.post('/api/register', {
        email,
        phone,
        username,
        password,
    });
};

const loginUser = (email, password) => {
    return axios.post(
        '/api/login',
        {
            email,
            password,
        },
        // credentials: 'include',
        // https://stackoverflow.com/questions/76473840/not-able-to-set-cookies-in-browser-in-express-and-react
        { withCredentials: true },
    );
};

const fetchAllUser = (page, limit) => {
    return axios.get(`/api/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
    return axios.delete('/api/user/delete', { data: { id: user.id } });
};

const fetchGroup = () => {
    return axios.get('/api/group/read');
};

const createNewUser = (userData) => {
    return axios.post('/api/user/create', {
        ...userData,
    });
};

const updateUser = (userData) => {
    return axios.put('/api/user/update', {
        ...userData,
    });
};

const getUserAccount = () => {
    return axios.get('/api/account');
};

export { registerNewUser, loginUser, fetchAllUser, deleteUser, fetchGroup, createNewUser, updateUser, getUserAccount };
