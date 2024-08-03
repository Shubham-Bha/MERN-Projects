import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    if (!credentials.email || !credentials.password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('token', json.authToken);
        navigate("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.background}>
      <Navbar />
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded p-4' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name='email'
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
              placeholder='Enter your email'
              required
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
          </div>
          <div className="m-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name='password'
              value={credentials.password}
              onChange={onChange}
              placeholder='Enter your password'
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/signup" className="m-3 mx-1 btn btn-danger">New User</Link>
        </form>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
};
