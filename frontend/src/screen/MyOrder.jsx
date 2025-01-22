import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const fetchMyOrder = async () => {
    console.log(
      "Fetching order data for email:",
      localStorage.getItem("userEmail")
    );
    try {
      const response = await fetch("https://gofood-cgi0.onrender.com/api/myorderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'origin': 'https://gofood-frontend-fme9.onrender.com',
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch order data");
      }

      const data = await response.json();
      console.log("Fetched Order Data:", data);
      setOrderData(data.orderData);
    } catch (error) {
      console.error("Error fetching order data:", error);
      setOrderData({
        error: "An error occurred while fetching your order data.",
      });
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return "Invalid Date";
    }
  };

  const groupItemsByDate = (data) => {
    const grouped = {};
    let currentDate = "";

    data.forEach((item) => {
      if (item.Order_date) {
        currentDate = item.Order_date;
        if (!grouped[currentDate]) {
          grouped[currentDate] = [];
        }
      } else if (item.id) {
        if (currentDate) {
          grouped[currentDate].push(item);
        }
      }
    });

    return grouped;
  };

  const renderOrderItems = (items) => {
    return items.map((orderItem, idx) => (
      <div className="col-12 col-md-6 col-lg-4" key={idx}>
        <div className="card mb-4 shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title">{orderItem.name || "No Name"}</h5>
            <p className="card-text">
              <span className="badge bg-secondary me-2">
                Qty: {orderItem.qty}
              </span>
              <span className="badge bg-info text-dark me-2">
                Size: {orderItem.size}
              </span>
              <span className="badge bg-primary">₹{orderItem.price}</span>
            </p>
          </div>
        </div>
      </div>
    ));
  };

  const renderGroupedOrders = () => {
    if (
      !orderData ||
      !Array.isArray(orderData.order_data) ||
      orderData.order_data.length === 0
    ) {
      return <p className="text-center text-muted">No orders found.</p>;
    }

    const groupedItems = groupItemsByDate(orderData.order_data);

    if (Object.keys(groupedItems).length === 0) {
      return (
        <p className="text-center text-muted">No valid order data found.</p>
      );
    }

    return Object.entries(groupedItems).map(([date, items], index) => (
      <div key={`date-${index}`} className="mb-5">
        <h4 className="text-primary">{formatDate(date)}</h4>
        <hr />
        <div className="row">{renderOrderItems(items)}</div>
      </div>
    ));
  };

  return (
    <div
      className={`min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <Navbar />
      <div className="container mt-4">
        <button
          className="btn btn-secondary mb-4"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle Dark Mode
        </button>

        {orderData === null ? (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : orderData.error ? (
          <p className="text-center text-danger">{orderData.error}</p>
        ) : (
          renderGroupedOrders()
        )}
      </div>
      <Footer />
    </div>
  );
}
