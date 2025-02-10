function Logo() {
    return (
        <div style={styles.container}>
            <img style={styles.cardImage}
                 src={"https://us.123rf.com/450wm/aguiters/aguiters1710/aguiters171000013/88108656-al%C4%B1%C5%9Fveri%C5%9F-sepeti-simgesi-vekt%C3%B6r.jpg?ver=6"}
                 style={styles.CardImg} alt={"logo"}/>
            <p style={styles.String}>Sepetim:</p>
            <p style={styles.String}>0.0tl</p>
        </div>
    )

}

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        backgroundColor: "white",
        paddingRight: "5px",
        padding:"7px",
        borderRadius:"7px",
        border: "2px solid green",
    },
    CardImg: {
        width: "2vh",
        height: "2vh",
        aspectRatio: "1/1",
        border:"1px dotted black",
    }, String: {margin:0,}


}
export default Logo;