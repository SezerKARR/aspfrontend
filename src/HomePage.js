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

    useEffect(() => {
        axios.get("https://localhost:5000/api/SaplingCategory/")
            .then(response => {
                setSaplingCategories(response.data);
            })
            .catch(Error => console.error("Error:", Error));
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
            <img  style={SharedStyles.image(hovered)} src={category.imageUrl} alt="Sapling"/>
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
                {saplingList.map(sapling => ( <SaplingTextWithHoverEffect sapling={sapling}/>))}
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
                onClick={() => navigate(`/Sapling/${sapling.name}`, {state: {saplingId: sapling.id}})}
            >
                <li key={sapling.id} style={styles.saplingsName}>{sapling.name}</li>
            </div>

        );
    };
    
    return (


        <div style={styles.content}>
           

            <h1 style={styles.PaddingWelcome}>Fidan Bahçemize Hoşgeldiniz</h1>
            <h1 style={styles.CategoriesText}>Kategoriler</h1>
            <div style={SharedStyles.ColumList}>
                {saplingCategories.length > 0 ? (saplingCategories.map(category => (
                    <div key={category.id} style={SharedStyles.columListElement}>
                        <ImageWithHoverEffect category={category}/>
                        <SaplingListContainer saplingList={category.saplingReadDtos}/>

                    </div>))) : (<p>Resimler yükleniyor...</p>)}

            </div>


        </div>);
}

const styles = {
    content:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    Headera: {
       
    },
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
