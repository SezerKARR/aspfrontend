import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "./Components/Logo/Logo";
import SearchBar from "./Components/SearchBar/SearchBar";
import CardString from "./Components/Card/CardString";
import Categories from "./Components/Categories";

// Dinamik bir Header bileşeni oluşturuyoruz
const Header = () => {
    const [hoveredLink, setHoveredLink] = useState(null); // Genel hover durumu

    // Mouse enter ve leave eventlerini bir fonksiyonla yönetiyoruz
    const handleHover = (link) => {
        setHoveredLink(link);
    };
    const data = [
        { name: "Apple", link: "https://www.apple.com" },
        { name: "Banana", link: "https://www.banana.com" },
        { name: "Cherry", link: "https://www.cherry.com" },
        // Add more items as needed
    ];
    return (
        <div style={styles.container}>
            
            <ul style={styles.ul}>
                {linkData.map((link) => (
                    <li key={link.to} style={styles.li}>
                        <Link
                            to={link.to}
                            style={styles.link(hoveredLink === link.to)}
                            onMouseEnter={() => handleHover(link.to)}
                            onMouseLeave={() => handleHover(null)}
                        >
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
            <div style={styles.Middle}>
                

                <div style={styles.LogoWrapper}><Logo/></div>
                <div style={styles.SearchBarWrapper}><SearchBar placeholder="Search fruits..." rawData={data}/></div>
                <div><CardString/></div>
            </div>
            <div style={styles.Bottom}>
                <Categories/>
            </div>
        </div>

    );
};

// Dinamik link verisi
const linkData = [
    {to: '/', text: 'Home'},
    {to: '/contact', text: 'İletişim'},
    {to: '/about', text: 'Hakkında'}, // Daha fazla öğe eklenebilir
];

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
    Bottom: {
        width: '60%',
        backgroundColor: 'orange',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Top: {
        backgroundColor: '#333',
    },
    ul: {
        margin: 0,
        width: '100%',
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#333',
    },
    li: {
        fontSize: "24px",
        margin: '0 15px',
    },
    Middle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: '20px', // Elemanlar arasına boşluk ekler
    },

    link: (isHovered) => ({
        color: isHovered ? 'blue' : '#fff', // Hover durumuna göre renk değişimi
        textDecoration: 'none',
        fontSize: '18px',
        transition: 'color 0.3s ease',
    }),
};

export default Header;