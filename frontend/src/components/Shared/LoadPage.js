import React from "react";

const LoadPage = () => {
  return (
    <div className="preloader" style={{ height: "100%", opacity: 0 }}>
      <div className="clear-loading loading-effect-2">
        <span></span>
      </div>
    </div>
  );
};

export default LoadPage;
