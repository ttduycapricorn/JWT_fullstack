import { LogoutUser } from '@/services/userService';
import { toast } from 'react-toastify';

export const menuItemsData = [
    {
        title: 'Logout',
        onclick: () => {
            if (LogoutUser()) {
                localStorage.removeItem('jwt');
                location.reload();
                toast.success('LOG OUT SUCCESSFULLY!');
            }
        },
        url: {},
    },
    {
        title: 'Users',
        url: '/user',
    },
    {
        title: 'Roles',
        url: '/roles',
    },
    {
        title: 'Login',
        url: '/login',
    },
    {
        title: 'Groups-Roles',
        url: '/group-role',
    },
];
