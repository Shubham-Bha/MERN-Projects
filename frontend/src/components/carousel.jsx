import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Carousel() {
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/958546/pexels-photo-958546.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="d-block w-100"
              alt="Slide 1"
              style={{ filter: "brightness(30%)", maxHeight: "650px" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-light"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="d-block w-100"
              alt="Slide 2"
              style={{ filter: "brightness(30%)", maxHeight: "650px" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="d-block w-100"
              alt="Slide 3"
              style={{ filter: "brightness(30%)", maxHeight: "650px" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/2273823/pexels-photo-2273823.jpeg?auto=compress&cs=tinysrgb&w=300"
              className="d-block w-100"
              alt="Slide 4"
              style={{ filter: "brightness(30%)", maxHeight: "650px" }}
            />
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
    </div>
  );
}
