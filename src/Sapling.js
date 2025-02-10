import React, {useState, useRef, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Magnifier from "./Magnifier";

function Sapling() {
    const navigate = useNavigate();
    const location = useLocation();
    const sapling = location.state?.sapling;

    const BigImages = ({ saplingHeights }) => {
        const [hoveredImageUrl, setHoveredImageUrl] = useState("");
        const [hoveredId, setHoveredId] = useState(-1);
        const [position, setPosition] = useState({ x: 0, y: 0 });
        const imageRefs = useRef([]);
        const hoverTimeoutRef = useRef(null);
        const handleMouseEnter = ({ id, imageUrl }) => {
            setHoveredId(id);
            

            setHoveredImageUrl(imageUrl);

        };

        const handleMouseMove = (e, id) => {
            if (imageRefs.current[id]) {
                const bounds = imageRefs.current[id].getBoundingClientRect();
                const scaleFactor = 1.6; // Resmin büyüme faktörü

                // Cursor'un büyütülmeden önceki konumunu hesapla
                const originalX = (e.clientX - bounds.left);
                const originalY = (e.clientY - bounds.top);

                // Büyütülmüş resme uygun şekilde orantılı olarak pozisyonu hesapla
                const scaledX = (originalX / bounds.width) * 100;
                const scaledY = (originalY / bounds.height) * 100;

                // Magnifier'ı büyütülmüş görsele göre yerleştir
                const magnifierX = originalX - (110 * scaleFactor); // Magnifier'ın X konumu
                const magnifierY = originalY - (80 * scaleFactor); // Magnifier'ın Y konumu

                // Daha akıcı olması için requestAnimationFrame kullan
                requestAnimationFrame(() => {
                    setPosition({
                        x: magnifierX, // Magnifier'ı cursor'un üzerine yerleştir
                        y: magnifierY,
                        backgroundPosition: `${scaledX}% ${scaledY}%`, // Büyütülmüş resmin arka planını doğru konumlandır
                    });
                });
            }
        };






        const handleMouseLeave = () => {
            setHoveredImageUrl("");
            setHoveredId(-1);
        };

        const addJust = (id) => {
            let localScale = "scale(1.01)";

            if (hoveredId === id) {
                localScale = "scale(1.6)";
            } else if (hoveredId === -1) {
                localScale = "scale(1)";
            } else {
                localScale = "scale(0.7)";
            }
            return localScale;
        };

        const bigImages = saplingHeights.filter(item => item.height === 0);

        const styleBigImages = {
            containerStyle: {
                width: "22%",
                maxHeight: "10%",
                borderRadius: "8px",
                position: "relative",
                cursor: "none",
            },
            ImageList: {
                paddingTop: "20px",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
                gap: "3vh",
            },
            imageStyle: (localTransform) => ({
                width: "600px",
                maxWidth: "100%",
                maxHeight: "20vh",
                aspectRatio: "1/1",
                transition: "transform 0.4s ease-in-out",
                transform: localTransform,
                transformOrigin: "center",
                border: "2px solid rgba(0, 0, 0, 1)",
                borderRadius: "8px",
                boxSizing: "border-box",
            }),
        };

        return (
            <div style={styleBigImages.ImageList}>
                {bigImages.length > 0 ? (
                    bigImages.map((bigImage, index) => (
                        <div
                            style={styleBigImages.containerStyle}
                            key={bigImage.id}
                            onMouseEnter={() => handleMouseEnter({ id: index, imageUrl: bigImage.imageUrl })}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={bigImage.imageUrl}
                                alt="Magnify"
                                style={styleBigImages.imageStyle(addJust(index))}
                                ref={(el) => (imageRefs.current[index] = el)}
                            />
                            {hoveredImageUrl && hoveredId === index && (
                                <Magnifier hoveredImageUrl={hoveredImageUrl} position={position} />
                            )}
                        </div>
                    ))
                ) : (
                    <p>Büyük resim yok</p>
                )}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.ColumList}>
                <p style={styles.content}>Çit halinde fidanlarımız:</p>
                <BigImages saplingHeights={sapling.saplingHeightReadDtos} />
            </div>
        </div>
    );
}

const styles = {
    content: {
        fontWeight: "bold",
        fontSize: "2vh",
    },
    container: {},
    ColumList: {
        maxHeight: "90vh",
        justifyContent: "flex-start",
        gap: "3vh",
        alignItems: "flex-start",
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "row",
    },
};

export default Sapling;
