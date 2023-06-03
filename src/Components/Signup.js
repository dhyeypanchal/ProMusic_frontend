import React, { useState, useRef } from 'react';
import "./css/login.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

    const [show, setshow] = useState(false)
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        // cpassword: ""
    });
    const navigate = useNavigate();

    function handleChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("https://promusic-backend.onrender.com/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        // console.log(json);
        // console.log(json.success);
        if (json.success) {
            // Save the auth token and redirect
            // console.log("under success");
            localStorage.setItem('token', json.token);
            toast.success("Successfully Registered");
            navigate("/"); // if user is authenticated so we redirect a uset to a home page of website.
            // here the token name is token and in login functionality in backend we give token name to the authtoken.
        }
        else if (!json.success) {
            toast.error("Invalid credentials");
        }

    }
    const pass = useRef();

    const showpassword = () => {

        setshow(!show)
        pass.current.type = show ? 'password' : 'text';

    }

    return (
        <div className="d-flex align-items-center justify-content-center main">
            <div style={{ width: "80%" }}>
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box" style={{ borderRadius: "8px" }}>
                        <div className="col-lg-12 login-key">
                            <i className="fa-sharp fa-solid fa-music"></i>
                        </div>
                        <div className="col-lg-12 login-title">
                            Sign up
                        </div>

                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-control-label">Your Name</label>
                                        <input type="text" className="form-control" id='name' value={credentials.name} onChange={handleChange} name="name" required autoComplete="off" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">Email</label>
                                        <input type="email" className="form-control" id='email' value={credentials.email} onChange={handleChange} name="email" required autoComplete="off" />
                                    </div>
                                    <div className="form-group">
                                        <div className="eye">
                                            <label className="form-control-label">Password</label>
                                            <input type="password" ref={pass} className="form-control" id='password' value={credentials.password} onChange={handleChange} name="password" required minLength={5} autoComplete="off" />
                                            {show ? <i class="fa-solid fa-eye" id='i' onClick={showpassword} style={{ color: "#0DB8DE" }}></i> : <i class="fa-solid fa-eye-slash" id="i" onClick={showpassword} style={{ color: "#0DB8DE" }}></i>}
                                        </div>
                                    </div>
                                    <div className="login-btm login-button d-flex justify-content-around" style={{ width: "100%" }}>
                                        <button type="submit" className="loginbtnn btn-hover">SIGN UP</button>
                                        <p className="text-light" style={{ paddingTop: "0.3rem" }}>Already Signup? <Link to="/login">Back to Login</Link></p>
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

export default Signup;