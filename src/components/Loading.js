import React from "react";
import loading from "../assets/loading.svg";

const Loading = () => (
  <div className="spinner" style={{
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)'
  }}>
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;