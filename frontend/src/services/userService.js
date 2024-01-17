import axios from 'axios';

const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8080/api/register', {
        email,
        phone,
        username,
        password,
    });
};

const loginUser = (email, password) => {
    return axios.post('http://localhost:8080/api/login', {
        email,
        password,
    });
};

const fetchAllUser = (page, limit) => {
    return axios.get(`http://localhost:8080/api/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
    return axios.delete('http://localhost:8080/api/user/delete', { data: { id: user.id } });
};

const fetchGroup = () => {
    return axios.get('http://localhost:8080/api/group/read');
};

export { registerNewUser, loginUser, fetchAllUser, deleteUser, fetchGroup };
