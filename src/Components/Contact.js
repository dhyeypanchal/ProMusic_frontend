import React, { useState } from 'react';
import "./css/login.css"
// import { useNavigate } from 'react-router-dom'

function Contact() {

    const [query, setquery] = useState({
        name: "",
        query: ""
    });

    function handleChange(e) {
        setquery({ ...query, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://promusic-backend.onrender.com/contact", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: query.name, query: query.query })
        });
        const json = await response.json()
        setquery({name:"",query:""})
        // console.log(json);
        if (json.success) {
            alert("Thank you for your feedback")
        }
        else {
            alert("Something went wrong")
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center main">
            <div style={{ width: "80%", maxWidth: "100rem" }}>
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box" style={{ borderRadius: "8px" }}>
                        <div className="col-lg-12 login-key">
                            <i className="fa-sharp fa-solid fa-music"></i>
                        </div>
                        <div className="col-lg-12 login-title">
                            Contact Us
                        </div>

                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-control-label">Name</label>
                                        <input type="text" className="input-control" id='name' value={query.name} onChange={handleChange} name="name" required autoComplete="off" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">Your Query</label>
                                        <input type="text" className="input-control" id='query' value={query.query} onChange={handleChange} name="query" required autoComplete="off" />
                                    </div>
                                    <div className=" d-flex justify-content-center" style={{ width: "100%" }}>
                                        <button type="submit" className="loginbtnn btn-hover">SUBMIT</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;