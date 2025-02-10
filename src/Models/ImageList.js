import React, { useState } from 'react';

const images = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150/0000FF/808080',
    'https://via.placeholder.com/150/FF0000/FFFFFF',
    'https://via.placeholder.com/150/FFFF00/000000',
    'https://via.placeholder.com/150/00FF00/0000FF'
];

function ImageList() {
    const [hoveredImage, setHoveredImage] = useState(null);

    const styles = {
        imageList: {
            display: 'flex',
            gap: '10px'
        },
        imageItem: {
            transition: 'transform 0.3s ease',
            flex: 1
        },
        hoveredImage: {
            transform: 'scale(1.5)',
            zIndex: 1
        },
        image: {
            width: '150px',
            height: '150px',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
        },
        nonHoveredImage: {
            transform: 'scale(0.8)' // Diğer görseller küçülüyor
        }
    };

    return (
        <div style={styles.imageList}>
            {images.map((image, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.imageItem,
                        ...(hoveredImage === index ? styles.hoveredImage : {}),
                        ...(hoveredImage !== null && hoveredImage !== index ? styles.nonHoveredImage : {})
                    }}
                    onMouseEnter={() => setHoveredImage(index)}
                    onMouseLeave={() => setHoveredImage(null)}
                >
                    <img src={image} alt={`item-${index}`} style={styles.image} />
                </div>
            ))}
        </div>
    );
}

export default ImageList;
