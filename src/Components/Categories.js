import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Categories(){
    const [hoveredLink, setHoveredLink] = useState(null);
    const [saplingCategories, setSaplingCategories] = useState([]);
    const handleHover = (link) => {
        setHoveredLink(link);
    };
    useEffect(() => {
        axios.get("https://localhost:5000/api/SaplingCategory/")
            .then(response => {
                setSaplingCategories(response.data);
                console.log(response.data);
            })
            .catch(Error => console.error("Error:", Error));
    }, [])
    return (
        <ul style={styles.ul}>
            {saplingCategories.map((saplingCategory) => (
                <li key={saplingCategory.id} style={styles.li}>
                    <Link
                        to={`/Category/${saplingCategory.slug}`}
                        style={styles.link(hoveredLink === saplingCategory.id)}
                        onMouseEnter={() => handleHover(saplingCategory.id)}
                        onMouseLeave={() => handleHover(null)}
                    >
                        
                        {saplingCategory.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

const styles = {
    categoryString: {
        fontcolor: "white",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
    },
    ul: {
        width: '100%',
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '20px',
    },
    li: {
        
    },

    link: (isHovered) => ({
        color: isHovered ? 'green' : '#fff', // Hover durumuna göre renk değişimi
        textDecoration: 'none',
        fontSize: '22px',
        transition: 'color 0.3s ease',
        border:"1px solid grey",
        padding: "10px",
        borderRadius:"20px",
        backgroundColor:isHovered ? "rgba(120,120,50,0.3)" : "",
    }),
};
export default Categories;