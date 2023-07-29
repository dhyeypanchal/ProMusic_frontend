import React, { useState, useRef } from 'react';
import "./css/login.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [show, setshow] = useState(false)

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    function handleChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://promusic-backend.onrender.com/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.token);
            // alert("Login Successfully")
            toast.success("Successfully Login");
            navigate("/"); // if user is authenticated so we redirect a user to music page.
        }
        else {
            toast.error("Invalid credentials")
        }
    }

    const pass = useRef();

    const showpassword = () => {

        setshow(!show)
        pass.current.type = show ? 'password' : 'text';

    }

    return (
        <div className="d-flex align-items-center justify-content-center main">
            <div style={{ width: "80%", maxWidth:"100rem" }}>
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box" style={{ borderRadius: "8px" }}>
                        <div className="col-lg-12 login-key">
                            <i className="fa-sharp fa-solid fa-music"></i>
                        </div>
                        <div className="col-lg-12 login-title">
                            Please Login
                        </div>

                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-control-label">Email</label>
                                        <input type="email" className="input-control" id='email' value={credentials.email} onChange={handleChange} name="email" required autoComplete="off" />
                                    </div>
                                    <div className="form-group">
                                        <div className="eye">
                                            <label className="form-control-label">Password</label>
                                            <input type="password" ref={pass} className="input-control" id='password' value={credentials.password} onChange={handleChange} name="password" required minLength={5} autoComplete="off" />
                                            {show ? <i className="fa-solid fa-eye" id='i' onClick={showpassword} style={{ color: "#0DB8DE" }}></i> : <i className="fa-solid fa-eye-slash" id="i" onClick={showpassword} style={{ color: "#0DB8DE" }}></i>}
                                        </div>
                                    </div>
                                    <div className="login-btm login-button d-flex justify-content-around" style={{ width: "100%" }}>
                                        <button type="submit" className="loginbtnn btn-hover">LOGIN</button>
                                        <p className="text-light" style={{ paddingTop: "0.3rem" }}>Not registered? <Link to="/signup">Create an account</Link></p>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position='bottom-right' theme="colored" />
        </div>
    )
}

export default Login;
