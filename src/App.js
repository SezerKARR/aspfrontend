import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./Header";
import Home from "./HomePage";
import Saplings from "./Saplings";
import Sapling from "./Sapling";
import React from "react";


function App() {
 
    return (

        <Router>
            <body style={styles.page}>
                <header >
                    <Header/>
                </header>
                <main style={styles.content}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Category/:categorySlug" element={<Saplings/>}/>
                        <Route path="/Sapling/:saplingSlug" element={<Sapling/>}/>
                    </Routes>
                </main>
            </body>
        </Router>

    );
}
const styles = {
    page:{
        flex: 1,
        backgroundImage: 'url("https://png.pngtree.com/thumb_back/fw800/background/20210831/pngtree-sapling-branches-and-leaves-soil-palm-plant-growth-background-image_771618.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        height: "100vh", /* Sayfa yüksekliğine göre arka plan */
    },
    content:{
       paddingTop:"20px"
    },
   
   
};
export default App;
