'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Pagination from 'react-bootstrap/Pagination';

import { fetchAllUser } from '@/services/useService';

function UserPage() {
    const [listUsers, setListUsers] = useState([]);

    const router = useRouter();

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            fetchUsers();
        } else {
            toast.warning('You don not Login in system!');
            router.push('/login');
        }
    }, []);

    const fetchUsers = async () => {
        let response = await fetchAllUser();
        if (response && response.data && response.data.EC === 0) {
            setListUsers(response.data.DT);
            console.log(response.data.DT);
        }
    };

    return (
        <>
            <div className="manage_container">
                <div className="userHeader">
                    <div className="title">
                        <h3>TABLE USERS</h3>
                    </div>
                    <div className="action">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            Refresh
                        </button>
                        <button className="btn btn-success">Add new user</button>
                    </div>
                    <div className="user-body container">
                        <table className="table table-dark table-striped-columns table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">User name</th>
                                    <th scope="col">Group</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers ? (
                                    listUsers.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <>Not found data!</>
                                )}
                            </tbody>
                        </table>
                        <div className="container">
                            <Pagination>
                                <Pagination.First />
                                <Pagination.Prev />
                                <Pagination.Item>{1}</Pagination.Item>
                                <Pagination.Ellipsis />

                                <Pagination.Item>{10}</Pagination.Item>
                                <Pagination.Item>{11}</Pagination.Item>
                                <Pagination.Item active>{12}</Pagination.Item>
                                <Pagination.Item>{13}</Pagination.Item>
                                <Pagination.Item disabled>{14}</Pagination.Item>

                                <Pagination.Ellipsis />
                                <Pagination.Item>{20}</Pagination.Item>
                                <Pagination.Next />
                                <Pagination.Last />
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserPage;
