'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

import { fetchAllUser } from '@/services/useService';

function UserPage() {
    const router = useRouter();

    const [listUsers, setListUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            fetchUsers();
        } else {
            toast.warning('You don not Login in system!');
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);
        if (response && response.data && response.data.EC === 0) {
            // setListUsers(response.data.DT);
            // console.log(response.data.DT);

            console.log(response.data.DT);
            setTotalPage(response.data.DT.totalPages);
            setListUsers(response.data.DT.users);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(event.selected + 1);
        // await fetchUsers(event.selected + 1);
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
                                    <th scope="col">Action</th>
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
                                                <td>
                                                    <button className="btn btn-warning">Update</button>
                                                    <button className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>Not found data!</tr>
                                )}
                            </tbody>
                        </table>
                        {totalPage > 0 && (
                            <div className="container">
                                <ReactPaginate
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={totalPage}
                                    previousLabel="< previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserPage;
