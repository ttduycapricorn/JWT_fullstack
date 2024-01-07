'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

import './login.scss';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: '#404243',
    },
};

function Login() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function closeModal() {
        setShow(false);
    }

    const handleCreateAccount = () => {
        alert('success create account!');
    };

    // Logic Register
    const handleRegister = () => {
        const userData = {
            email,
            phoneNumber,
            username,
            password,
        };

        console.log('>>check user data: ', userData);
    };

    useEffect(() => {
        // axios.get('http://localhost:8080/api/test_api').then((data) => {
        //     console.log('>>check data: ', data);
        // });
    }, []);

    return (
        <>
            {/* Modal register */}

            <Modal className="modalRegister" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="text-center">
                            <h2 className="title">REGISTER</h2>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group py-3">
                            <label htmlFor="exampleInputPassword1">Phone number</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone number"
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group pb-3">
                            <label htmlFor="exampleInputPassword1">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group pb-3">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group pb-3">
                            <label htmlFor="exampleInputPassword1">Re-enter password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Re-enter password"
                                value={conformPassword}
                                onChange={(e) => {
                                    setConformPassword(e.target.value);
                                }}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-outline-dark" onClick={handleRegister}>
                        Register
                    </button>
                    <button type="submit" className="btn btn-outline-success" onClick={closeModal}>
                        Already have an account. Login
                    </button>
                </Modal.Footer>
            </Modal>

            <div className="login_container">
                <div className="container">
                    <div className="row">
                        <div className="text-center">
                            <h2 className="title">LOGIN</h2>
                        </div>
                        <div className="content_right col-12 d-flex flex-column gap-3 py-3">
                            <input className="form-control" type="text" placeholder="Email address or phone number" />
                            <input className="form-control" type="password" placeholder="password" />
                            <button className="btn btn-secondary" type="submit">
                                Login
                            </button>
                            <span className="text-center">
                                <Link href={'/'}>Forgot password ?</Link>
                            </span>
                            <hr />
                            <button className="btn btn-outline-success" type="submit" onClick={handleShow}>
                                Create a new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
