import React, { useState, useEffect } from "react";

const Magnifier = ({ hoveredImageUrl, position }) => {
    const [scale, setScale] = useState(0); // Başlangıçta 0

    useEffect(() => {
        // 500ms içinde scale değerini 1.6'ya getir
        const timeout = setTimeout(() => {
            setScale(1.6);
        }, 300); // 300ms sonra büyümeye başlar

        return () => clearTimeout(timeout); // Component unmount olursa temizle
    }, []); // Boş bağımlılık array -> sadece bir kez çalışır (component mount olduğunda)

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
        transform: `scale(${scale})`, // Dinamik scale
        transition: "transform 0.3s ease-in-out", // Animasyon efekti
        top: position.y,
        left: position.x,
    };

    return <div style={magnifierStyle} />;
};

export default Magnifier;
