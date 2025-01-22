import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/card";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFoodItems = async () => {
    try {
      let response = await fetch("https://gofood-cgi0.onrender.com/api/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://gofood-frontend-fme9.onrender.com',
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      response = await response.json();
      let Data = response.data
      setFoodItems(Data.foodItems);
      setFoodCat(Data.foodCategories);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoodItems();

    // Initialize Bootstrap carousel manually
    const carouselElement = document.querySelector("#carouselExampleIndicators");
    if (carouselElement) {
      new window.bootstrap.Carousel(carouselElement, {
        interval: 2000,
        ride: "carousel",
      });
    }
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-indicators">
          {["Slide 1", "Slide 2", "Slide 3", "Slide 4"].map((label, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-label={label}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {[
            "https://images.pexels.com/photos/958546/pexels-photo-958546.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/2273823/pexels-photo-2273823.jpeg?auto=compress&cs=tinysrgb&w=300",
          ].map((src, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                src={src}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
                style={{ filter: "brightness(30%)", maxHeight: "650px" }}
              />
            </div>
          ))}
          <div className="carousel-caption d-flex justify-content-center align-items-center" style={{ zIndex: 10 }}>
            <form className="d-flex w-50">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="bg-secondary text-white">
        <div className="container rounded-3 p-4">
          {foodCat.length > 0 ? (
            foodCat.map((category) => (
              <div key={category._id} className="mb-5">
                <h3 className="text-center mb-4 text-light">{category.CategoryName}</h3>
                <hr />
                <div className="row">
                  {foodItem.length > 0 ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === category.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filteredItem) => (
                        <div key={filteredItem._id} className="col-12 col-md-6 col-lg-4 mb-4">
                          <Card
                            foodItem={filteredItem}
                            options={filteredItem.options[0]}
                          />
                        </div>
                      ))
                  ) : (
                    <div className="text-center">No items found</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No categories available</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
