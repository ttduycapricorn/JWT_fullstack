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

const fetchRolesByGroup = (groupId) => {
    return axios.get(`/api/role/by-group/${groupId}`);
};

const assignRoleToGroup = (data) => {
    return axios.post('/api/role/assign-to-group', { data });
};

export { createRole, DeleteRole, fetchAllRoles, fetchRolesByGroup, assignRoleToGroup };
