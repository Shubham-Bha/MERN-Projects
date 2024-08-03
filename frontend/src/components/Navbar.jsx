import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../components/ContextReducer'; // Import useCart to get cart data
import Modal from '../Modal';
import Cart from '../screen/Cart';

export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    let navigate = useNavigate();
    const cartItems = useCart(); // Get cart items from context

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    const loadCart = () => {
        setCartView(true);
    };

    // Calculate total number of items in the cart
    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.qty, 0);
    };

    const itemCount = getCartItemCount(); // Get item count

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
            style={{ boxShadow: "0px 10px 20px black", position: "fixed", zIndex: "10", width: "100%" }}>
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>
                        </li>
                        {localStorage.getItem("token") && (
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder">My Orders</Link>
                            </li>
                        )}
                    </ul>
                    {localStorage.getItem("token") ? (
                        <div className="d-flex align-items-center">
                            <button className="btn bg-white text-success mx-2 position-relative" onClick={loadCart} aria-label="View Cart">
                                <i className="bi bi-cart fs-4"></i>
                                {itemCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {itemCount}
                                    </span>
                                )}
                            </button>
                            {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
                            <button onClick={handleLogout} className="btn bg-white mx-2  text-success">Logout</button>
                        </div>
                    ) : (
                        <form className="d-flex">
                            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                            <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
}
