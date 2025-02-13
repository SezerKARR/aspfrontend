import axios from "axios";
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./Header";
import "./Home.css";
import {useNavigate} from 'react-router-dom';
import {SharedStyles} from "./SharedStyles";
import SearchBar from "./Components/SearchBar/SearchBar";
import Logo from "./Components/Logo/Logo";

function HomePage() {
    const navigate = useNavigate();
    const [saplingCategories, setSaplingCategories] = useState([]);
    const [saplings, setSaplings] = useState([]);
    useEffect(() => {
        axios.get("https://localhost:5000/api/SaplingCategory/")
            .then(response => {
                setSaplingCategories(response.data);
            })
            .catch(Error => console.error("Error:", Error));
        axios.get("https://localhost:5000/api/Sapling/")
            .then(response => {
                console.log(response.data);
                setSaplings(response.data);
            }).catch(Error => console.error("Error:", Error));
    }, [])
    const handleCategoryClick = (category) => {
        console.log(category);
        // Kategoriye tıklandığında, o kategoriye ait sapling ID'lerini alıyoruz
        axios.get(`https://localhost:5000/api/SaplingCategory/${category.id}`)
            .then(response => {
                console.log(response.data);
                const saplingIds = response.data.saplingReadDtos.map(sapling => sapling.id); // Sapling ID'lerini alıyoruz
                console.log(saplingIds);

                navigate(`/Category/${category.name}`, {state: {saplingIds: saplingIds}});
                // Eğer tıklanan kategoriye ait sayfaya yönlendirmek isterseniz:
                // navigate(`/category/${categoryId}`, { state: { saplingIds } });
            })
            .catch(error => console.error("Error:", error));
    };
    const ImageWithHoverEffect = ({category}) => {
        const [hovered, setHovered] = useState(false);
        console.log("hovered", category);


        return (<div
            style={SharedStyles.ImageAndNameContainer}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => handleCategoryClick(category)}
        >
            <img style={SharedStyles.image(hovered)} src={category.imageUrl} alt="Sapling"/>
            <div style={SharedStyles.textOverlay(hovered)}>{category.name}</div>
        </div>);
    };
    const SaplingListContainer = ({saplingList}) => {
        const [hovered, setHovered] = useState(false);

        const styles = {
            saplingList: {
                padding: "0", // Varsayılan padding'i kaldır
                margin: "0",
                height: "auto", // Yüksekliği içerik kadar olsun
                justifyContent: "center",
                listStyleType: "none",
                // İçeriğe göre genişlik otomatik ayarlanacak
                maxWidth: "100%",
                width: "auto", // Maksimum genişlik %100 olacak
                gap: "24px",
                textAlign: "center",
                flexWrap: "wrap", // Sığmazsa alt satıra geçer
                borderRadius: "5px",
                display: "flex",
                paddingTop: "10px",
                paddingBottom: "10px",
                backgroundColor: hovered ? "rgba(200,125,150,0.8)" : "rgba(200, 125, 150, 0.5)", // Arka plan rengi
            },


        }
        return (
            <ul style={styles.saplingList}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                {saplingList.map(sapling => (<SaplingTextWithHoverEffect sapling={sapling}/>))}
            </ul>)
    }
    const SaplingTextWithHoverEffect = ({sapling}) => {
        const [hovered, setHovered] = useState(false);

        const styles = {

            saplingsName: {
                cursor: "pointer",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingBottom: "2px",
                backgroundColor: hovered ? "rgba(150, 255, 255, 1)" : "rgba(250, 255, 255, 0.6)",
                borderRadius: "15px",
                fontSize: "24px",
                color: hovered ? "rgba(120, 0, 0, 1)" : "rgba(50,0,0, 1)",
                fontWeight: "bold",
            },
        };

        return (<div
                style={styles.container}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => navigate(`/Sapling/${sapling.slug}`, {state: {saplingId: sapling.id}})}
            >
                <li key={sapling.id} style={styles.saplingsName}>{sapling.name}</li>
            </div>

        );
    };
    const getPriceRange = (sapling) => {
        console.log(sapling);
        if (!sapling.saplingHeightReadDtos || sapling.saplingHeightReadDtos.length === 0) {
            return "Fiyat bilgisi yok";
        }

        const prices = sapling.saplingHeightReadDtos.map(height => height.saplingMoney);
        const validPrices = prices.filter(price => price > 0).sort((a, b) => a - b);
        const minPrice = validPrices.length > 0 ? validPrices[0] : null;

        console.log(prices);
        const maxPrice = Math.max(...prices);

        return minPrice === maxPrice ? `${minPrice} TL` : `${minPrice} - ${maxPrice} TL`;
    };
    const HomeSapling = ({ sapling }) => {
        const [hoveredElement, setHoveredElement] = useState(null);
        const [hovered, setHovered] = useState(false);
            
        const styles = {
            listElement:(hovered)=>( {
                width: "10%",
                border: "1px solid black",
                outline: hovered? "3px solid black":"none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                flexDirection: "column",
                backgroundColor: hovered?"rgba(255, 250, 250, 1)":"rgba(200, 200, 200, 0.8)",
            }),
            hoverable: {
                cursor: "pointer",
                padding: "5px",
                borderRadius: "5px",
                margin:"10px",
            },
            
            
            image: {
                marginTop: "10px",
                padding:"-5px",
                width: "calc(100% - 30px)",
                aspectRatio: 1,
            },
            saplingName: {
                fontSize: "22px",
                textAlign: "center",
                backgroundColor: "rgba(0, 125, 0, 0.5)",
            },
            saplingMoney:(hoverBool) =>({
                backgroundColor: hoverBool?"green":"white",
                color: hoverBool?"white": "green",
                fontSize: "20px",
                borderRadius: "5px",
                padding: "2px",
                border:"2px solid green",
                transition: "background-color 0.3s ease, color 0.3s ease",
            }),
            reviewString: {
                backgroundColor: "rgba(225, 130, 10, 0.6)",
                border: "1px solid green",
            },
        };
        const OnClick = () => {
            navigate(`/Sapling/${sapling.slug}`)  
        };
        return (
            <div style={styles.listElement(hovered)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            
                onClick={() =>OnClick()}>
                <img
                    style={{ ...styles.hoverable,...styles.image,  outline: hoveredElement === "image" ? "2px solid green" : "none" }}
                    src={sapling.imageUrl}
                    alt={sapling.name}
                    onMouseEnter={() => setHoveredElement("image")}
                    onMouseLeave={() => setHoveredElement(null)}
                />
                <p
                    style={{ ...styles.saplingName, ...styles.hoverable, outline: hoveredElement === "name" ? "2px solid green" : "none" }}
                    onMouseEnter={() => setHoveredElement("name")}
                    onMouseLeave={() => setHoveredElement(null)}
                >
                    {sapling.name}
                </p>
                <p
                    style={styles.saplingMoney(hoveredElement === "money")}
                    onMouseEnter={() => setHoveredElement("money")}
                    onMouseLeave={() => setHoveredElement(null)}
                >
                    {getPriceRange(sapling)}
                </p>
                <p
                    style={{ ...styles.reviewString, ...styles.hoverable, outline: hoveredElement === "review" ? "2px solid green" : "none" }}
                    onMouseEnter={() => setHoveredElement("review")}
                    onMouseLeave={() => setHoveredElement(null)}
                >
                    Detayları incele
                </p>
            </div>
        );
    };

    return (


        <div style={styles.content}>


            {/*<h1 style={styles.PaddingWelcome}>Fidan Bahçemize Hoşgeldiniz</h1>*/}
            {/*<h1 style={styles.CategoriesText}>Kategoriler</h1>*/}
            <div style={styles.ColumList}>
                {saplings.length > 0 ? (saplings.map(sapling => (
                        // <div key={category.id} style={SharedStyles.columListElement}>
                        //     <ImageWithHoverEffect category={category}/>
                        //     <SaplingListContainer saplingList={category.saplingReadDtos}/>
                        //
                        // </div>))) 
                        <HomeSapling sapling={sapling}/>)))
                    : (<p>Resimler yükleniyor...</p>)}

            </div>


        </div>);
}

const styles = {
    ColumList: {
        width: "100%",
        minWidth: "100px",
        paddingTop: "30px",
        maxHeight: "90vh",
        justifyContent: "center",
        gap: "3vh",
        display: "flex",
        flexDirection: "row",


    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    Headera: {},
    // Header: {
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     width: "80%", // Header genişliğini tam ekran yap
    //     height: "124px", // Header yüksekliği
    //     backgroundColor: "#f8f8f8", // Test için arka plan rengi
    //     border: "1px solid red", // Debug için çerçeve
    // },
    // ColumList: {
    //     paddingTop:"30px",
    //     maxHeight: "90vh",
    //     overflowY: "auto",
    //     justifyContent: "center",
    //     gap: "3vh",
    //     alignItems: "flex-start",
    //     flexWrap: "wrap", // Eğer 4'ten fazla olursa alt satıra geçsin
    //     display: "flex",
    //     flexDirection: "row",
    //     paddingLeft: "0px",
    //     paddingRight: "0px",
    //
    //
    // },

    CategoriesText: {
        textAlign: "center",
    },
    PaddingWelcome: {
        textAlign: 'center'
    },


};
export default HomePage;
