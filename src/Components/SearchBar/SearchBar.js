import React, {useEffect, useState} from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function SearchBar({ placeholder = "Search...", rawData = [] }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        // Transform the rawData into the desired structure
        const transformed = rawData.map(item => ({
            title: item.name, // Assuming 'name' is the property in rawData
            link: item.link // Constructing a link based on 'id'
        }));

        setData(transformed);
    }, [rawData]);
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);

        if (searchWord === "") {
            setFilteredData([]);
            return;
        }
        const newFilter = data.filter((value) =>{
            return value.title?.toLowerCase().includes(searchWord.toLowerCase());}
        );
        setFilteredData(newFilter);
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    return (
        <div className="search" style={styles.container}>
            <div className="searchInputs" style={styles.input}>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {wordEntered ? (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    ) : (
                        <SearchIcon />
                    )}
                </div>
            </div>
            {filteredData.length > 0 && (
                <div className="dataResult" style={styles.result}>
                    {filteredData.slice(0, 15).map((value, index) => (
                        <a
                            key={index}
                            className="dataItem"
                            href={value.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p>{value.title}</p>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
const styles = {
    container: {
        width: "292px",
    },
    input:{
      width: "280px",
        border: "2px solid green",
        borderRadius:"15px",
    }
}
export default SearchBar;
