import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
function Home() {
  return (
    <Base title="Home Page" description="welcome to the Tshirt Store">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-warning">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-danger">TEST</button>
        </div>
      </div>
    </Base>
  );
}

export default Home;
