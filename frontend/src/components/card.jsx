import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  let data = useCart();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  let options = props.options || {};
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItem;
  const dispatch = useDispatchCart();

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    let food = data.find(item => item.id === foodItem._id) || {};

    if (food.size === size) {
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
    } else {
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * (parseInt(options[size]) || 0);

  return (
    <div className="card mt-3 bg-dark text-white" style={{ width: "18rem", maxHeight: "400px" }}>
      <img src={foodItem.img} className="card-img-top" alt={foodItem.name} style={{ height: "150px", objectFit: "cover" }} />
      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
        <div className="container p-0">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <select className="form-select form-select-sm w-auto bg-success text-white" onClick={handleClick} onChange={handleQty}>
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className="form-select form-select-sm w-auto bg-success text-white ms-2" ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            <div className="fs-5 ms-2">₹{finalPrice}/-</div>
          </div>
          <hr />
          <div className="text-center">
            <button className="btn btn-sm btn-success" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
