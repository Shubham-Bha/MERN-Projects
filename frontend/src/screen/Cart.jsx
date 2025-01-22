import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (!Array.isArray(data)) {
    return <div className='alert alert-danger'>Error: Cart data is not an array.</div>;
  }

  if (data.length === 0) {
    return (
      <div className='container text-center my-5'>
        <div className='alert alert-info fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index }); // Adjust action type if necessary
  };

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
  
    if (!userEmail) {
      console.error("User email is missing.");
      return;
    }

    try {
      const response = await fetch("https://gofood-cgi0.onrender.com/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://gofood-frontend-fme9.onrender.com',
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      if (response.ok) {
        dispatch({ type: "DROP" });
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className='container my-5'>
      <div className='table-responsive'>
        <table className='table table-dark table-hover'>
          <thead className='table-secondary'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={`${food.id}-${food.size}-${index}`}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={() => handleRemove(index)}
                    aria-label={`Remove ${food.name} from cart`}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <h2 className='text-light'>Total Price: ₹{totalPrice} /-</h2>
        <button className='btn btn-success' onClick={handleCheckOut}>
          Check Out
        </button>
      </div>
    </div>
  );
}
