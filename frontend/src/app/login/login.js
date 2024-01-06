import Link from 'next/link';
import './login.scss';

function Login() {
    return (
        <>
            <div className="login_container">
                <div className="container">
                    <div className="row">
                        <div className="title text-center">
                            <h1>LOGIN</h1>
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
                            <button className="btn btn-outline-success" type="submit">
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
