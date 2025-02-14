import React, {useState, useRef, useEffect} from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import GlassMagnifier from "./GlassMagnifier";
import saplings from "./Saplings";

function Sapling() {
    const [sapling, setSapling] = useState(null);
    const [hoveredId, setHoveredId] = useState("");

    const {saplingSlug} = useParams();
    const [matureSaplings, setMatureSaplings] = useState([]);
    const [youngSaplings, setYoungSaplings] = useState([]);
    const [clickedImage, setClickedImage] = useState(null);
    useEffect(() => {
        console.log(youngSaplings);
        setClickedImage(youngSaplings[0]);
    }, [youngSaplings]);
    useEffect(() => {
        console.log(saplingSlug);

        if (!saplingSlug) return;
        console.log(encodeURIComponent(saplingSlug));
        axios.get(`https://saplingstore-u189.onrender.com/api/Sapling/${encodeURIComponent(saplingSlug)}`)
            .then(response => {
                if (!response.data || response.data.length === 0) {
                    throw new Error("Kategori bulunamadı");
                }
                hand(response.data);

                // const filteredSaplings = sapling.saplingHeightReadDtos.map(height => ({
                //     ...sapling,
                //     firstValidSapling: sapling.saplingList.find(item => item.height > 0) || null
                // }));
                // console.log(sapling);

            })

            .catch(error => {
                console.error("Veri yüklenirken hata oluştu:", error);
            });
    }, [saplingSlug]);

    const hand = (data) => {
        setSapling(data);
        
        console.log(data);
        const {zeroHeightSaplings, nonZeroHeightSaplings} = data.saplingHeightReadDtos
            .reduce((acc, item) => {
                if (item.height === 0) {
                    acc.zeroHeightSaplings.push(item);
                } else {
                    acc.nonZeroHeightSaplings.push(item);
                }
                return acc;
            }, {zeroHeightSaplings: [], nonZeroHeightSaplings: []});
        console.log(zeroHeightSaplings, nonZeroHeightSaplings);
        setMatureSaplings(zeroHeightSaplings.sort((a, b) => a.height - b.height));
        setYoungSaplings(nonZeroHeightSaplings.sort((a, b) => a.height - b.height));


        return null;
    }
    //
    // const handleClick = (youngSapling) => {
    //     setClickedImage(youngSapling)
    // }
   
    const IsHovered=(id)=>{
        if(!clickedImage)return false;
        return id === clickedImage.id;
        
    }
    return (<div style={styles.container}>
            {matureSaplings && <div style={styles.ColumList}>
                {(matureSaplings.map(matureSapling => (
                    <img style={styles.matureImg(IsHovered(matureSapling.id),matureSaplings.length)} src={matureSapling.imageUrl}
                         onClick={() => setClickedImage(matureSapling)}
                         alt={matureSapling.img}/>)))}

            </div>}

            <div style={styles.ContainerMiddle}>
                <div style={styles.RowYoungImages}>

                    {(youngSaplings.map(youngSapling => (

                        <img onClick={() => setClickedImage(youngSapling)}
                             style={styles.youngImg(IsHovered(youngSapling.id))}
                             src={youngSapling.imageUrl}
                             alt={youngSapling.img}/>)))}

                    {/*{(matureSaplings.map(matureSapling => (*/}

                    {/*<img style={styles.imgStyle(matureSapling.id)} src={matureSapling.imageUrl} alt={matureSapling.img}/>)))}*/}
                </div>
                <div>  {clickedImage &&
                    <GlassMagnifier imgUrl={clickedImage.imageUrl} alt={clickedImage.imageUrl}/>} </div>
                {sapling && clickedImage && (
                    <HeightDescription clickedImage={clickedImage} sapling={sapling} />
                )}

            </div>


        </div>

    );
}


// const MainContent = ({setClickedImage, clickedImage, youngSaplings}) => {
//
//   
//
//     return (
//        
//
//     )
//
// };
const HeightDescription = ({clickedImage,sapling}) => {
    const stylesHeightDescription = {
        columnDescription: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(250,215,200,0.6)",
            padding: "10px",
            borderRadius: "15px",
        },
        nameString: {}, DescriptionString: {},
        moneyString: {color:"green"}

    }
    console.log(sapling);
    return (
        <div style={stylesHeightDescription.columnDescription}>
            <h1 style={stylesHeightDescription.nameString} key={"Name"}>{sapling.name} </h1>
            <p style={stylesHeightDescription.DescriptionString} key={"dsc"}>{sapling.description}</p>
            <p style={stylesHeightDescription.moneyString} key={"dsc"}>{clickedImage.saplingMoney}TL</p>
        </div>
    )

}
const styles = {
    ContainerMiddle: {
        border: "2px solid rgba(100, 250, 250, 0.61)",
        backgroundColor: "rgba(20,90,50,0.5",
        borderRadius: "15px",
        height: "auto",
        alignItems: "center",
        gap: "10px",
        display: "flex",
        padding: "5px", // Optional
    }, RowYoungImages: {

        maxHeight: "31vh",
        width: "10vh",
        display: "flex",
        flexDirection: "column",
        gap: "1px",
        aspectRatio: "",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        padding: "0",
        boxSizing: "border-box",
        borderRadius: "8px",
        overflowY: "scroll", // Kaydırma aktif olacak
        overflowX: "hidden",
    }, youngImg: (hovered) => ({
        cursor: "pointer",
        border: hovered ? "2px solid rgba(0, 0, 0, 1)" : "none",
        borderRadius: "8px",
        margin: "2px",
        height: "100%",
        aspectRatio: "1/1",
        zIndex: 10,
    }), matureImg: (hovered,lenght) => ({
        outline: hovered ? "2px solid rgba(0, 0, 0, 1)" : "none",
        maxWidth: `${100 / (lenght + 1)}%`,
        maxHeight: "10vh",
        cursor: "pointer",
        borderRadius: "5px",
        aspectRatio: "1.2/1",

    }),
    content: {
        fontWeight: "bold", fontSize: "2vh",
    }, container: {

        display: "flex", flexDirection: "column  ", alignItems: "center", gap: "3vh",
    }, ColumList: {
        width: "80%",
        justifyContent: "center",
        gap: "3vh",
        alignItems: "center",
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "row",
    },


};

export default Sapling;
