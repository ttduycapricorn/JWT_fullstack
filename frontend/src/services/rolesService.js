import axios from '@/customize/axios';

const createRole = (roles) => {
    return axios.post('/api/role/create', [...roles]);
};

const fetchAllRoles = () => {
    return axios.get('api/role/read');
};

const DeleteRole = (role) => {
    return axios.delete('api/role/delete', { data: { id: role.id, url: role.url } });
};

export { createRole, DeleteRole, fetchAllRoles };
