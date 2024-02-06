'use client';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import styles from './roles.module.scss';

const cx = classNames.bind(styles);

function roles(props) {
    const [listChild, setListChild] = useState({
        child1: {
            url: '',
            description: '',
        },
    });

    useEffect(() => {
        Object.entries(listChild).map(([key, value]) => {
            console.log(key, value);
        });
    }, []);

    const handleOnchange = (name, value, key) => {
        let _ListChild = _.cloneDeep(listChild);

        _ListChild[key][name] = value;

        setListChild(_ListChild);
    };

    const handleAddNewInput = () => {
        let _ListChild = _.cloneDeep(listChild);

        _ListChild[`child0-${uuidv4()}`] = {
            url: '',
            description: '',
        };

        setListChild(_ListChild);
    };

    const handelDeleteInput = (key) => {
        let _ListChild = _.cloneDeep(listChild);
        delete _ListChild[key];
        setListChild(_ListChild);
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
                                            className={cx('form-control')}
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
                            <button className={cx('btn btn-warning')}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default roles;
