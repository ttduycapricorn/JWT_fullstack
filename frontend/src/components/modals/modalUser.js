'use client';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { fetchGroup, createNewUser, updateUser } from '@/services/userService';

function ModalUser(props) {
    const { actions, data_modal_user } = props;

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        role: '',
        address: '',
        sex: '',
        group: '',
    };

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        role: true,
        address: true,
        sex: true,
        group: true,
    };

    const [userGroup, setUserGroup] = useState([]);
    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    useEffect(() => {
        getGroup();
    }, []);

    useEffect(() => {
        if (actions === 'UPDATE') {
            setUserData({ ...data_modal_user, group: data_modal_user.Group ? data_modal_user.Group.id : '' });
        }
    }, [data_modal_user]);

    const getGroup = async () => {
        let response = await fetchGroup();
        if (response && response.EC === 0) {
            setUserGroup(response.DT);
            // toast.success(response.EM);
            if (response.DT && response.DT.length > 0) {
                let groups = response.DT;
                setUserData({ ...userData, group: groups[0].id });
            }
        } else {
            toast.error(response.EM);
        }
    };

    const handleOnchangeInput = (value, typeName) => {
        let _userData = _.cloneDeep(userData);

        _userData[typeName] = value;
        setUserData(_userData);
    };

    const checkValidateInputs = () => {
        // check input user
        if (actions === 'UPDATE') return true;
        setValidInputs(validInputsDefault); //reset State inputs in form
        let check = true;
        let array = ['email', 'phone', 'password', 'role'];
        let _ValidInputs = _.cloneDeep(validInputsDefault);
        for (let i = 0; i < array.length; i++) {
            if (!userData[array[i]]) {
                toast.error(`Empty input ${array[i]}!`);
                _ValidInputs[array[i]] = false;

                setValidInputs(_ValidInputs);
                check = false;
                break;
            }
        }
        if (userData[array[1]].length < 10) {
            toast.error('phone number must must be at least 10 characters or more!');
            check = false;
            _ValidInputs[array[1]] = false;
            setValidInputs(_ValidInputs);
        }

        return check;
    };

    const handleConformUser = async () => {
        checkValidateInputs();
        if (checkValidateInputs() === true) {
            let response =
                actions === 'CREATE'
                    ? await createNewUser({ ...userData, groupId: userData['group'] })
                    : await updateUser({ ...userData, groupId: userData['group'] });
            if (response && response.EC === 0) {
                toast.success(response.EM);
                props.onHide();
                setUserData({ ...defaultUserData, group: userGroup && userGroup.length > 0 ? userGroup[0].id : '' });
            } else {
                toast.error(response.EM);
                let _ValidInputs = _.cloneDeep(validInputsDefault);
                _ValidInputs[response.DT] = false;
                setValidInputs(_ValidInputs);
            }
        }
    };

    const handleCloseModalUser = () => {
        props.onHide();
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
    };

    return (
        <>
            <Modal
                {...props}
                onHide={() => {
                    handleCloseModalUser();
                }}
                size="lg-down"
                aria-labelledby="contained-modal-title-vcenter"
                style={{ color: 'black' }}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ fontWeight: '900' }}>
                        <span>{props.actions === 'CREATE' ? 'Create new user' : 'Edit user'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3 is-invalid" controlId="exampleForm.ControlInput1">
                        <Form.Label>
                            Email address (<span className="red">*</span>)
                        </Form.Label>
                        <Form.Control
                            isInvalid={validInputs.email === false}
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                            disabled={actions === 'CREATE' ? false : true}
                            value={userData.email === '' ? '' : userData.email || ''}
                            onChange={(event) => {
                                handleOnchangeInput(event.target.value, 'email');
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Phone Number (<span className="red">*</span>)
                        </Form.Label>
                        <Form.Control
                            isInvalid={validInputs.phone === false}
                            type="text"
                            disabled={actions === 'CREATE' ? false : true}
                            value={userData.phone === '' ? '' : userData.phone || ''}
                            onChange={(event) => {
                                handleOnchangeInput(event.target.value, 'phone');
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>User name</Form.Label>
                        <Form.Control
                            isInvalid={validInputs.username === false}
                            type="text"
                            placeholder=""
                            value={userData.username || ''}
                            onChange={(event) => {
                                handleOnchangeInput(event.target.value, 'username');
                            }}
                        />
                    </Form.Group>

                    {actions === 'CREATE' && (
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Password (<span className="red">*</span>)
                            </Form.Label>
                            <Form.Control
                                isInvalid={validInputs.password === false}
                                type="password"
                                placeholder=""
                                value={userData.password === '' ? '' : userData.password || ''}
                                onChange={(event) => {
                                    handleOnchangeInput(event.target.value, 'password');
                                }}
                            />
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Role (<span className="red">*</span>)
                        </Form.Label>
                        <Form.Control
                            isInvalid={validInputs.role === false}
                            type="text"
                            placeholder=""
                            value={userData.role || ''}
                            onChange={(event) => {
                                handleOnchangeInput(event.target.value, 'role');
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            as={'textarea'}
                            type="text"
                            placeholder=""
                            value={userData.address === '' ? '' : userData.address || ''}
                            onChange={(event) => {
                                handleOnchangeInput(event.target.value, 'address');
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => {
                                handleOnchangeInput(event.target.value, 'sex');
                            }}
                            value={userData.sex === '' ? '' : userData.sex || ''}
                        >
                            <option value={false}>Male</option>
                            <option value={true}>Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Group (<span className="red">*</span>)
                        </Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => {
                                handleOnchangeInput(event.target.value, 'group');
                            }}
                            value={userData.group === '' ? '' : userData.group || ''}
                        >
                            {userGroup.length > 0 &&
                                userGroup.map((item, index) => {
                                    return (
                                        <option key={index + 1} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleCloseModalUser();
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleConformUser();
                        }}
                    >
                        {props.actions === 'CREATE' ? 'Create' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;
