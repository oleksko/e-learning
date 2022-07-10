import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="page-footer p-2 bg-black text-white">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="footer-left">
                        <h4>E-Learning</h4>
                        <br/>
                    </div>
                    <div className="footer-right">
                        <h4>Contacts</h4>
                    </div>
                </div>
                <div className="mx-auto" style={{width: "200px"}}>
                    <p>© Copyright</p>
                </div>
            </div>
        </footer>
    );
}

export default  Footer;