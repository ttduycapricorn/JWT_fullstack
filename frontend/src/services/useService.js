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

const fetchAllUser = () => {
    return axios.get('http://localhost:8080/api/user/read');
};

export { registerNewUser, loginUser, fetchAllUser };
