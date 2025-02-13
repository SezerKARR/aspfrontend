import React, {useState, useRef, useEffect} from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import GlassMagnifier from "./GlassMagnifier";

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
        axios.get(`https://localhost:5000/api/Sapling/${encodeURIComponent(saplingSlug)}`)
            .then(response => {
                if (!response.data || response.data.length === 0) {
                    throw new Error("Kategori bulunamadı");
                }
                setSapling(response.data);
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
// Küçükten büyüğe sıralama
        setMatureSaplings(zeroHeightSaplings.sort((a, b) => a.height - b.height));
        setYoungSaplings(nonZeroHeightSaplings.sort((a, b) => a.height - b.height));


        return null;
    }
    const BigImage = () => {
        const [hoveredImageUrl, setHoveredImageUrl] = useState("");
        const [position, setPosition] = useState({x: 0, y: 0});
        const imageRef = useRef();


        return (<div>

            </div>

        );
    };

    const handleClick = (youngSapling) => {
        setClickedImage(youngSapling)
    }

    return (<div style={styles.container}>
            {matureSaplings && <MatureSaplings clickedImage={clickedImage} matureSaplings={matureSaplings} setClickedImage={setClickedImage}
            />}
            <MainContent setClickedImage={setClickedImage} clickedImage={clickedImage} youngSaplings={youngSaplings}/>
           


        </div>

    );
}

const MatureSaplings = ({setClickedImage,clickedImage, matureSaplings}) => {
    console.log(matureSaplings);
    const stylesMatureSaplings = {
        imgStyle: (id) => ({
            outline: clickedImage != null ? id === clickedImage.id ? "2px solid rgba(0, 0, 0, 1)" : "none" : "none",
            maxWidth: `${100 / (matureSaplings.length + 1)}%`,
            maxHeight: "10vh",
            cursor: "pointer",
            borderRadius:"5px",
            aspectRatio: "1.2/1",

        })
    }

    return (<div style={styles.ColumList}>
            {(matureSaplings.map(matureSapling => (
                <img style={stylesMatureSaplings.imgStyle(matureSapling.id)} src={matureSapling.imageUrl}
                     onClick={()=>setClickedImage(matureSapling)}
                     alt={matureSapling.img}/>)))}

        </div>


    )

};
const MainContent = ({setClickedImage, clickedImage, youngSaplings}) => {

    const stylesYoungSaplingsScreener = {
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
        }, imgStyle: (id) => ({
            cursor: "pointer",
            border: clickedImage != null ? id === clickedImage.id ? "2px solid rgba(0, 0, 0, 1)" : "none" : "none",
            borderRadius: "8px",
            margin: "2px",
            height: "100%",
            aspectRatio: "1/1",
            zIndex: 10,
        }),
    }

    return (<div style={stylesYoungSaplingsScreener.ContainerMiddle}>
            <div style={stylesYoungSaplingsScreener.RowYoungImages}>

                {(youngSaplings.map(youngSapling => (

                    <img onClick={() => setClickedImage(youngSapling)}
                         style={stylesYoungSaplingsScreener.imgStyle((youngSapling.id))}
                         src={youngSapling.imageUrl}
                         alt={youngSapling.img}/>)))}

                {/*{(matureSaplings.map(matureSapling => (*/}

                {/*<img style={styles.imgStyle(matureSapling.id)} src={matureSapling.imageUrl} alt={matureSapling.img}/>)))}*/}


            </div>
            <div>  {clickedImage && <GlassMagnifier imgUrl={clickedImage.imageUrl} alt={clickedImage.imageUrl}/>} </div>
        </div>

    )

};
const styles = {
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
