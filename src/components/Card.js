import React from "react";
const Card = ({ children, onClick,key }) => {
  return (
    <>
      <div key={key} onClick={onClick} className="bgCard p-10 m-20 cardStrcture hkbKwA">
        {children}
      </div>
    </>
  );
};

export default Card;
