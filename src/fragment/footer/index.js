import React from 'react';
import "./footer.css";
import {Link} from 'react-router-dom';

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "8px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

function Footer({ children }) {

    /*const sobeParaOTopo = () => {
        window.scrollTo(0, 0);
    };*/

    return (
        <div>
            <div style={style}>
                <center>
                  • <Link to="/">Página inicial</Link>
                </center>
                <center>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://client-health-wellness.herokuapp.com/"> health-wellness.com</a>
                </center>
            </div>
        </div>
    )
}

export default Footer;