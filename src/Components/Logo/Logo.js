function Logo(){
    return (
        <img src={"https://i.imgur.com/h7vdiR1.png"} style={styles.logoImg} alt={"logo"}/>
    )
   
}
const styles = {
    logoImg:{
        width: "300px",
        height: "120px",
        aspectRatio:"1/1",
        border: "2px solid green",
        borderRadius:"15px",
        
    },
}
export default Logo;