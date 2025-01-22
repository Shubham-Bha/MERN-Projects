import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SignUp() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://gofood-cgi0.onrender.com/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'origin': 'https://gofood-frontend-fme9.onrender.com',
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
            });
            const json = await response.json();
            console.log(json);
            if (!json.success) {
                alert("Enter Valid Credentials");
            } else {
                alert("User created successfully");
                navigate('/login')
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the user");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Navbar />
            <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-dark text-light py-5">
                <div className="container col-md-6 col-lg-4">
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <div className="card shadow-lg p-4 text-dark">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter your name"
                                    value={credentials.name}
                                    onChange={onChange}
                                    name="name"
                                    required
                                />
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="email" className="form-label ">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    value={credentials.email}
                                    onChange={onChange}
                                    name="email"
                                    required
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={credentials.password}
                                    onChange={onChange}
                                    name="password"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="geolocation" className="form-label">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="geolocation"
                                    value={credentials.geolocation}
                                    onChange={onChange}
                                    name="geolocation"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mb-3">
                                Submit
                            </button>
                            <Link to="/login" className="btn btn-secondary w-100">Already a user?</Link>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
