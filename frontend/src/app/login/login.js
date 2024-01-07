'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import axios from 'axios';

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
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleCreateAccount = () => {
        alert('success create account!');
    };

    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=2').then((data) => console.log('>>check data axios: ', data));
    }, []);

    return (
        <>
            {/* Modal register */}
            <Modal
                // appElement={el}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className="container row">
                    <form>
                        <div class="form-group py-3">
                            <div className="text-center">
                                <h2 className="title">REGISTER</h2>
                            </div>
                            <label for="exampleInputEmail1">Email address</label>
                            <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                            />
                        </div>
                        <div class="form-group pb-3">
                            <label for="exampleInputPassword1">Phone number</label>
                            <input
                                type="text"
                                class="form-control"
                                id="exampleInputPassword1"
                                placeholder="Phone number"
                            />
                        </div>
                        <div class="form-group pb-3">
                            <label for="exampleInputPassword1">Username</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Username" />
                        </div>
                        <div class="form-group pb-3">
                            <label for="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                            />
                        </div>
                        <div class="form-group pb-3">
                            <label for="exampleInputPassword1">Re-enter password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                placeholder="Re-enter password"
                            />
                        </div>

                        <div className="col-12 d-flex flex-column gap-3 py-3">
                            <button type="submit" class="btn btn-success" onClick={handleCreateAccount}>
                                Already have an account. Login
                            </button>
                            <button type="submit" class="btn btn-outline-danger" onClick={closeModal}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
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
                            <button className="btn btn-outline-success" type="submit" onClick={openModal}>
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
