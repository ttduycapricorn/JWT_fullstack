'use client';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import _ from 'lodash';

import { fetchGroup } from '@/services/userService';
import { fetchAllRoles, fetchRolesByGroup } from '@/services/rolesService';

import style from './groupRole.module.scss';

const cx = classNames.bind(style);

function GroupRole() {
    const [userGroup, setUserGroup] = useState([]);
    const [listRoles, setListRoles] = useState([]);
    const [selectGroup, setSelectGroup] = useState('');
    const [assignRoleByGroup, setAssignRoleByGroup] = useState([]);

    useEffect(() => {
        getGroup();
        getAllRoles();
    }, []);

    const getGroup = async () => {
        let response = await fetchGroup();
        // console.log('>>check response Group: ', response);
        if (response && response.EC === 0) {
            setUserGroup(response.DT);
        } else {
        }
    };

    const getAllRoles = async () => {
        let data = await fetchAllRoles();
        if (data && +data.EC === 0) {
            setListRoles(data.DT);
        }
    };

    const handleOnchangeGroup = async (value) => {
        setSelectGroup(value);
        if (value) {
            let data = await fetchRolesByGroup(value);

            if (data && data.EC === 0) {
                let result = buildDataRolesByGroup(data.DT.Roles, listRoles);
                console.log(result);
                setListRoles(result);
                setAssignRoleByGroup(result);
            }
        }
    };

    const buildDataRolesByGroup = (groupRole, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map((role) => {
                let object = {};
                object.id = role.id;
                object.url = role.url;
                object.description = role.description;
                object.isAssigned = false;

                if (groupRole && groupRole.length > 0) {
                    object.isAssigned = groupRole.some((x) => x.url === role.url);
                }
                result.push(object);
            });
        }
        return result;
    };

    const handleSelectRoles = (value) => {
        const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
        const foundIndex = _assignRoleByGroup.findIndex((item) => +item.id === +value);
        if (foundIndex > -1) {
            _assignRoleByGroup[foundIndex].isAssigned = !_assignRoleByGroup[foundIndex].isAssigned;
        }
        setAssignRoleByGroup(_assignRoleByGroup);
    };

    return (
        <div className={cx('group-role-container')}>
            <div className={cx('container')}>
                <div className={cx('container-xl mt-3')}>
                    <h4>Group role:</h4>
                    <div className={cx('assign-groupRole')}>
                        <form>
                            <fieldset>
                                <label>
                                    Select groups (<span className={cx('red')}>*</span>):
                                </label>
                                <div className="mb-3">
                                    <select
                                        id="disabledSelect"
                                        className="form-select"
                                        onChange={(event) => {
                                            handleOnchangeGroup(event.target.value);
                                        }}
                                    >
                                        <option value={''}>"please'</option>
                                        {userGroup.length > 0 &&
                                            userGroup.map((item, index) => {
                                                return (
                                                    <option key={index + 1} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </fieldset>
                        </form>
                        <hr />
                        {selectGroup && (
                            <div className={cx('')}>
                                {listRoles.length > 0 &&
                                    assignRoleByGroup.map((item, index) => {
                                        return (
                                            <div className="form-check" key={`list-role-${index}`}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={item.id}
                                                    id={`list-role-${index}`}
                                                    checked={item.isAssigned}
                                                    onChange={(e) => {
                                                        handleSelectRoles(e.target.value);
                                                    }}
                                                />
                                                <label
                                                    className={cx('form-check-label')}
                                                    htmlFor={`list-role-${index}`}
                                                >
                                                    {item.url}
                                                </label>
                                            </div>
                                        );
                                    })}
                                <div className={cx('mt-3')}>
                                    <button className={cx('btn btn-warning')}>Save</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupRole;
