import React from "react";

const PopUp = ({ title, body, ref }) => {
    return (
      <>
        <div className="backdrop"></div>
        <div className="popup" ref={ref}>
          <div className="popup-content">
            <h2 className="textColor">{title}</h2>
            <p className="textColor font14 bgColour">{body}</p>
          </div>
        </div>
      </>
    );
};
  
export default PopUp;
