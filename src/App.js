import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./Header";
import Home from "./HomePage";
import Saplings from "./Saplings";
import Sapling from "./Sapling";


function App() {
 
    return (
        <Router>
            <div style={styles.page}>
                <Header />
                <div style={styles.content}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Category/:categoryName" element={<Saplings/>}/>
                        <Route path="/Sapling/:saplingReadDto" element={<Sapling/>}/>
                    </Routes>
                </div>
            </div>
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
