import pattern1 from "../assets/img/bg1.png"
import pattern2 from "../assets/img/bg2.png"
import pattern3 from "../assets/img/bg3.png"
import pattern4 from "../assets/img/bg4.jpg"
import pattern6 from "../assets/img/bg6.jpg"
import pattern7 from "../assets/img/wild.jpeg"


// home page css
export const homePageBgStyle = {
    width: "100%",
    height: "100vh",
    overflow: 'auto',
    backgroundImage: `url(${pattern2})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
}

// login page css
export const loginPageBgStyle = {
    width: "100%",
    height: "100vh",
    overflow: 'auto',
    backgroundImage: `url(${pattern6})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
}


// update page css
export const uploadPageBgStyle = {
    width: "100%",
    height: "100vh",
    overflow: 'auto',
    backgroundImage: `url(${pattern2})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
}


// home page image detail model css
export const imageDetailModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '90%',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    bgcolor: 'background.paper',
    overflow: 'auto'
}

// setting page edit modal css
export const editModalStyle = {

    backgroundImage: `url(${pattern4})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '90%',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
}


export const usersPageButton = {
    textTransform: 'none',
    width: 100
}

export const loginTypoStyle = {
    backgroundImage: `url(${pattern7})`,
    backgroundSize: 'contain',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    fontSize: 30,
    fontWeight: 700

}
