'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import './login.scss';
import { registerNewUser } from '@/services/useService';

function Login() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');

    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConformPassword: true,
    };

    const [isValidCheck, setIsValidCheck] = useState(defaultValidInput);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        // formRef.current.reset();
    };

    // Logic Register
    const formRef = useRef();

    const isValidInputs = () => {
        setIsValidCheck(defaultValidInput);

        if (!email) {
            toast.error('Email is required!');
            setIsValidCheck({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        if (!phone) {
            toast.error('phone is required!');
            setIsValidCheck({ ...defaultValidInput, isValidPhone: false });
            return false;
        }
        if (!username) {
            toast.error('username is required!');
            setIsValidCheck({ ...defaultValidInput, isValidUsername: false });
            return false;
        }
        if (!password) {
            toast.error('password is required!');
            setIsValidCheck({ ...defaultValidInput, isValidPassword: false });
            return false;
        }

        if (password != conformPassword) {
            toast.error('Your password is not same!');
            return false;
        }

        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(email)) {
            toast.error('Please enter a email valid in form!');
            return false;
        }

        return true;
    };

    const handleRegister = () => {
        let checkValid = isValidInputs();
        if (checkValid == true) {
            registerNewUser(email, phone, username, password);
        }
    };

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
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.target.reset();
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                type="email"
                                className={isValidCheck.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                ref={formRef}
                            />
                        </div>
                        <div className="form-group py-3">
                            <label htmlFor="exampleInputPassword1">Phone number</label>
                            <input
                                type="text"
                                className={isValidCheck.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                ref={formRef}
                            />
                        </div>
                        <div className="form-group pb-3">
                            <label htmlFor="exampleInputPassword1">Username</label>
                            <input
                                type="text"
                                className={isValidCheck.isValidUsername ? 'form-control' : 'form-control is-invalid'}
                                placeholder="Username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                ref={formRef}
                            />
                        </div>
                        <div className="form-group pb-3">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className={isValidCheck.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                ref={formRef}
                            />
                        </div>
                        <div className="form-group pb-3">
                            <label htmlFor="exampleInputPassword1">Re-enter password</label>
                            <input
                                type="password"
                                className={
                                    isValidCheck.isValidConformPassword ? 'form-control' : 'form-control is-invalid'
                                }
                                placeholder="Re-enter password"
                                value={conformPassword}
                                onChange={(e) => {
                                    setConformPassword(e.target.value);
                                }}
                                ref={formRef}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-outline-dark" onClick={handleRegister}>
                        Register
                    </button>
                    <button type="submit" className="btn btn-outline-success" onClick={handleClose}>
                        Already have an account. Login
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Form login  */}
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
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                                onClick={() => {
                                    handleShow();
                                }}
                            >
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
