import React from "react";

export default function Base({
  title = "My Title",
  description = "My description",
  className = "text-white p-4",
  children,
}) {
  return (
    <div>
      <div className="container-fluid">
        <dv className="jumbotron  text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </dv>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic beatae
            reiciendis enim consequatur dolores mollitia voluptatem deserunt
            nisi doloremque optio!
          </h4>
          <button className="btn btn-warning btn-lg">Connect Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            An Amazing place to buy <span className="text-white">Tshirt</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
