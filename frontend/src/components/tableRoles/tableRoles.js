'use client';
import classNames from 'classnames/bind';
import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { fetchAllRoles, DeleteRole } from '@/services/rolesService';

import style from './tableRole.module.scss';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);

const TableRoles = forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState();

    useEffect(async () => {
        getAllRoles();
    }, []);

    useImperativeHandle(ref, () => ({
        fetchListRoles() {
            getAllRoles();
        },
    }));

    const getAllRoles = async () => {
        let data = await fetchAllRoles();
        if (data && +data.EC === 0) {
            setListRoles(data.DT);
        }
    };

    const handleDeleteRole = async (role) => {
        // if (role.url === '/role/create') {
        //     toast.error(`Can't delete function create URL!`);
        //     return;
        // }
        let data = await DeleteRole(role);
        if (data && +data.EC === -2) {
            toast.error(data.EM);
        }
        if (data && +data.EC === 0) {
            toast.success(data.EM);
            await getAllRoles();
        }
        await getAllRoles();
    };

    return (
        <>
            <div className="user-body">
                <table className="table table-dark table-striped-columns table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Url</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRoles && listRoles.length > 0 ? (
                            listRoles.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.url}</td>
                                        <td>{item.description}</td>
                                        <td className="actions">
                                            <span title="edit">
                                                <FontAwesomeIcon
                                                    className="edit"
                                                    icon={faPencilAlt}
                                                    onClick={() => {
                                                        handleEditUser(item);
                                                    }}
                                                />
                                            </span>
                                            <span title="delete">
                                                <FontAwesomeIcon
                                                    className="delete"
                                                    icon={faTrash}
                                                    onClick={() => {
                                                        handleDeleteRole(item);
                                                    }}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={4} style={{ alignItems: 'center' }}>
                                    Not found Roles!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
});

export default TableRoles;
