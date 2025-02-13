import React, { useState, useEffect } from "react";

const Magnifier = ({ hoveredImageUrl, position }) => {
 

  

    const magnifierStyle = {
        position: "absolute",
        pointerEvents: "none",
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        backgroundImage: `url(${hoveredImageUrl})`,
        backgroundSize: "1000% 1000%",
        backgroundPosition: position.backgroundPosition,
        border: "2px solid #000",
        zIndex: 10,
        backgroundRepeat: "no-repeat",
      
        transition: "transform 0.3s ease-in-out", // Animasyon efekti
        top: position.y,
        left: position.x,
    };

    return <div style={magnifierStyle} />;
};

export default Magnifier;
