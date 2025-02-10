export const SharedStyles = {
    ImageAndNameContainer: {
        position: "relative",
        cursor: "pointer",
        
    },
    image: (hovered) => ({
        width: "600px",
        maxWidth: "100%",
        maxHeight: "20vh",
        aspectRatio: "1/1", // Kare oranı korunsun
        transition: "transform 0.3s ease-in-out",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        transformOrigin: "center",
        border: "2px solid rgba(0, 0, 0, 1)",
        borderRadius: "8px",
        boxSizing: "border-box",
        
    }),
    textOverlay: (hovered) => ({
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "green",
        transition: "transform 0.3s ease-in-out, font-size 0.3s ease-in-out",
        fontSize: hovered ? "48px" : "24px",
        whiteSpace: "nowrap",
        fontWeight: "bold",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    }),
    columListElement: {
        maxWidth: "20%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1vh",
    },
    ColumList: {
        paddingTop:"30px",
        maxHeight: "90vh",
        overflowY: "auto",
        justifyContent: "center",
        gap: "3vh",
        alignItems: "flex-start",
        flexWrap: "wrap", // Eğer 4'ten fazla olursa alt satıra geçsin
        display: "flex",
        flexDirection: "row",
        paddingLeft: "0px",
        paddingRight: "0px",
        
        
    },
};