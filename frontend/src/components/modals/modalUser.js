import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { fetchGroup } from '@/services/userService';

function ModalUser(props) {
    const [userGroup, setUserGroup] = useState([]);

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [address, setAddress] = useState('');
    const [sex, setSex] = useState('');
    const [group, setGroup] = useState('');

    useEffect(() => {
        getGroup();
    }, []);

    const getGroup = async () => {
        let response = await fetchGroup();
        if (response && response.data && response.data.EC === 0) {
            setUserGroup(response.data.DT);
            // toast.success(response.data.EM);
        } else {
            toast.error(response.data.EM);
        }
    };

    return (
        <>
            <Modal
                {...props}
                onHide={props.onHide}
                size="lg-down"
                aria-labelledby="contained-modal-title-vcenter"
                style={{ color: 'black' }}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ fontWeight: '900' }}>
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>
                            Email address (<span className="red">*</span>)
                        </Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" autoFocus />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Phone Number (<span className="red">*</span>)
                        </Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Password (<span className="red">*</span>)
                        </Form.Label>
                        <Form.Control type="password" placeholder="" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Role (<span className="red">*</span>)
                        </Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as={'textarea'} type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Group (<span className="red">*</span>)
                        </Form.Label>
                        <Form.Select aria-label="Default select example">
                            {userGroup.length > 0 &&
                                userGroup.map((item, index) => {
                                    return (
                                        <option key={index + 1} defaultValue={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary">Handle</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;
