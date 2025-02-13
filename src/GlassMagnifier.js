import React, { useState, useRef } from 'react';

const GlassMagnifier = ({ imgUrl, zoomLevel = 3, size = 150 }) => {
    const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = imgRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        // Calculate the position of the magnifier
        const xPos = x - size / 2;
        const yPos = y - size / 2;

        // Calculate the background position
        const xPercentage = (x / width) * 100;
        const yPercentage = (y / height) * 100;

        setCursorPosition({ x: xPos, y: yPos });
        setBackgroundPosition(`${xPercentage}% ${yPercentage}%`);
    };

    const containerStyle = {
        
        position: 'relative',
        display: 'inline-block',
        cursor: showMagnifier ? 'none' : '',
    };

    const imgStyle = {
        border:'2px solid black' ,
        display: 'block',
        height: '100%',
        aspectRatio:"1.5/1",
    };

    const magnifierStyle = {
        cursor: 'none',
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: backgroundPosition,
        backgroundSize: `${imgRef.current?.width * zoomLevel}px ${imgRef.current?.height * zoomLevel}px`,
        borderRadius: '50%',
        border: '2px solid #fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
    };

    return (
        <div
            style={containerStyle}
            onMouseEnter={() => setShowMagnifier(true)}
            onMouseLeave={() => setShowMagnifier(false)}
            onMouseMove={handleMouseMove}
        >
            <img
                ref={imgRef}
                src={imgUrl}
                alt="Magnified"
                style={imgStyle}
            />
            {showMagnifier && <div style={magnifierStyle} />}
        </div>
    );
};

export default GlassMagnifier;
