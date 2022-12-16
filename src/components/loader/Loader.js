import React from "react";
import loaderImg from "../../ass/yy3.gif";
import ReactDOM from "react-dom";


const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = () => {
  return (
    <div >
      <img src={loaderImg} alt="Loading..." />
    </div>
  );
};

export default Loader;
