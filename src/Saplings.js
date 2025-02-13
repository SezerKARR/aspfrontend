import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {SharedStyles} from "./SharedStyles";



function Saplings() {
    const navigate = useNavigate();
    const location = useLocation();
    const [category, setCategory] = useState(null);
    const [saplings, setSaplings] = useState([]);
    const { categorySlug } = useParams();
    useEffect(() => {
        if (!categorySlug) return;  // Eğer kategori adı yoksa işlemi durdur
        console.log(encodeURIComponent(categorySlug));
        // 1️⃣ Kategori bilgilerini al
        axios.get(`https://localhost:5000/api/SaplingCategory/${encodeURIComponent(categorySlug)}`)
            .then(response => {
                if (!response.data || response.data.length === 0) {
                    throw new Error("Kategori bulunamadı");
                }
                
                setCategory(response.data);  // Gelen kategoriyi kaydet
                setSaplings(response.data.saplingReadDtos);
                // 2️⃣ Kategori ID'sine göre saplingleri al
                
            })
            
            .catch(error => {
                console.error("Veri yüklenirken hata oluştu:", error);
            });
    }, [categorySlug]);

    const ImageWithHoverEffect = ({saplingReadDto}) => {
        const [hovered, setHovered] = useState(false);
        
        return (
            <div
                style={SharedStyles.ImageAndNameContainer}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => navigate(`/Sapling/${saplingReadDto.slug}`, {state: {sapling: saplingReadDto}})}
            >
                <img src={saplingReadDto.imageUrl} alt="saplingReadDtos" style={SharedStyles.image(hovered)} />
                <div style={SharedStyles.textOverlay(hovered)}>{saplingReadDto.name}</div>
            </div>
        );
    };

    const Money = ({saplingHeights}) => {
        const values = saplingHeights.map(dto => dto.saplingMoney);
        const minValue = values.length > 0 ? Math.min(...values)+"TL" : null;
        const maxValue = values.length > 0 ? Math.max(...values)+"TL" : null;
        return (
            <h1 style={styles.Money}>{minValue} - {maxValue}</h1>
        );
    };

    if (!saplings) return <p>Yükleniyor...</p>;

    return (
        <div style={styles.container}>
            <div style={SharedStyles.ColumList}>
                {saplings.length > 0 ? (saplings.map(saplingReadDto => (
                        <div key={saplingReadDto.id} style={SharedStyles.columListElement}>
                            <ImageWithHoverEffect saplingReadDto={saplingReadDto}/>
                            <Money saplingHeights={saplingReadDto.saplingHeightReadDtos}/>
                        </div>
                    ))
                ) : (
                    <p>Resimler yükleniyor...</p>
                )}
            </div>
        </div>

    );
}

const styles = {
    description: {
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Açık arka plan
        color: "#333", // Koyu yazı rengi
        padding: "10px",
        borderRadius: "8px",
        bottom: "10px",
        left: "50%",
        width: "90%", // İçeriğe bağlı genişlik
        textAlign: "left",
        textIndent:"20px",
        fontSize: "18px",
        fontWeight: "bold",
    },
    container: {
    },
    Categories: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    categoryContainer: {
        width: "33%",
        textAlign: "center",
        padding: "25px",
        marginBottom: "10px"
    },


    Money: {
        paddingTop: "20px",
        fontSize: "20px",
        color: "black",
    }
};
export default Saplings;
