import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* LinkedIn Icon and Profile Badge */}
        <div className="d-flex align-items-center">
          <a
            href="https://in.linkedin.com/in/shubham-bhardwaj-05a689256?trk=profile-badge"
            className="text-white fs-4 d-flex align-items-center me-3"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
          <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="dark" data-type="VERTICAL" data-vanity="shubham-bhardwaj-05a689256" data-version="v1">
            <a className="text-white text-decoration-none lh-1 d-flex align-items-center" href="https://in.linkedin.com/in/shubham-bhardwaj-05a689256?trk=profile-badge">
              <h4 className="mb-0">SHUBHAM BHARDWAJ</h4>
            </a>
          </div>
        </div>
        <a
          href="/"
          className="text-white text-decoration-none lh-1 d-flex align-items-center"
        >
          {/* Placeholder for additional links */}
        </a>
        <span className="text-white mb-0">© 2024 GoFood, Inc</span>
      </div>
    </footer>
  );
}
