'use client';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { UserContext } from '@/context/useContext';
import { createRole } from '@/services/rolesService';

import styles from './roles.module.scss';

const cx = classNames.bind(styles);

function roles(props) {
    const router = useRouter();
    const { user } = useContext(UserContext);

    const dataChildDefault = {
        url: '',
        description: '',
        isValidURL: true,
    };

    const [listChild, setListChild] = useState({
        child1: dataChildDefault,
    });

    useEffect(() => {
        Object.entries(listChild).map(([key, value]) => {
            console.log(key, value);
        });
    }, []);

    useEffect(() => {
        if (user.isAuthenticated === false) {
            toast.error(`you don't have login!`);
            router.push('/login');
        }
    });

    const handleOnchange = (name, value, key) => {
        let _ListChild = _.cloneDeep(listChild);

        _ListChild[key][name] = value;

        if (value && name === 'url') {
            _ListChild[key]['isValidURL'] = true;
        }

        setListChild(_ListChild);
    };

    const handleAddNewInput = () => {
        let _ListChild = _.cloneDeep(listChild);

        _ListChild[`child0-${uuidv4()}`] = dataChildDefault;

        setListChild(_ListChild);
    };

    const handelDeleteInput = (key) => {
        let _ListChild = _.cloneDeep(listChild);
        delete _ListChild[key];
        setListChild(_ListChild);
    };

    const buildDataToPersist = () => {
        let _ListChild = _.cloneDeep(listChild);
        let result = [];

        Object.entries(_ListChild).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description,
            });
        });
        return result;
    };

    const handleSave = async () => {
        // const check = true;
        const inValid = Object.entries(listChild).find(([key, child], index) => {
            return child && !child.url;
        });

        if (!inValid) {
            // call api
            let data = buildDataToPersist();
            let response = await createRole(data);
            if (response && response.EC === 0) {
                toast.success(response.EM);
            }
            console.log('>>check data build: ', data);
        } else {
            let _ListChild = _.cloneDeep(listChild);
            const key = inValid[0];
            _ListChild[key]['isValidURL'] = false;
            setListChild(_ListChild);
            toast.error('Input URL must have value!');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('mt-3')}>
                    <div className={cx('tittle-row')}>
                        <h4>Add a new row...</h4>
                    </div>
                    <div className={cx('role-parent')}>
                        {Object.entries(listChild).map(([key, child], index) => {
                            return (
                                <div className={cx('row role-child mt-2')} key={`child-${key}`}>
                                    <div className={cx('col-5 form-group')}>
                                        <label>URL:</label>
                                        <input
                                            className={
                                                child.isValidURL ? cx('form-control') : cx('form-control is-invalid')
                                            }
                                            type="text"
                                            value={child.url}
                                            onChange={(e) => {
                                                handleOnchange('url', e.target.value, key);
                                            }}
                                        />
                                    </div>
                                    <div className={cx('col-5 form-group')}>
                                        <label>Description:</label>
                                        <input
                                            className={cx('form-control')}
                                            type="text"
                                            value={child.description}
                                            onChange={(e) => {
                                                handleOnchange('description', e.target.value, key);
                                            }}
                                        />
                                    </div>
                                    <div className={cx('col-2 mt-4 icon-plus')}>
                                        <button
                                            className={cx('btn btn-primary mx-2')}
                                            onClick={() => {
                                                handleAddNewInput();
                                            }}
                                        >
                                            Add
                                        </button>
                                        {index >= 1 && (
                                            <button
                                                className={cx('btn btn-danger')}
                                                onClick={() => {
                                                    handelDeleteInput(key);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        <div className={cx('col-2 mt-3')}>
                            <button
                                className={cx('btn btn-warning')}
                                onClick={() => {
                                    handleSave();
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default roles;
