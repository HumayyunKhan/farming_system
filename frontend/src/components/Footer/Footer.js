import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import RR_logo from '../../images/RR192.png'


export default function Footer() {
    return (
        <footer className="footer-section pt-5">
            <div className="container">
                <div className="footer-cta pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="fa-solid fa-location-dot"></i>
                                <div className="cta-text">
                                    <h4>Find us</h4>
                                    <span>DHA phase 9, Lahore, Pakistan</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="fas fa-phone"></i>
                                <div className="cta-text">
                                    <h4>Call us</h4>
                                    <span>+923008169527</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="far fa-envelope-open"></i>
                                <div className="cta-text">
                                    <h4>Mail us</h4>
                                    <span>muhammedrehan622@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-content pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 mb-50">
                            <div className="footer-widget">
                                <div className="footer-logo">
                                    <Link to={'/'}><img src={RR_logo} className="img-fluid" alt="logo" /></Link>
                                </div>
                                <div className="footer-text">
                                    <p>Welcome to RR-Farming - where go-to for cute companions and gourmet rabbit meat. Find joy in furry friendships
                                        and elevate your culinary adventures with our premium selection. Delight awaits at RR-Farming! 🐇🍴
                                    </p>
                                </div>
                                <div className="footer-social-icon">
                                    <span>Follow us</span>
                                    <Link to="https://www.facebook.com/rehanishaqrabbitfarmingofficial?mibextid=2JQ9oc" target="_blank"><i className="fab fa-facebook-f facebook-bg"></i></Link>
                                    <Link to="https://www.instagram.com/rohanrehanfarming?igsh=aHV3b2Y5bnB2d3l2" target="_blank"><i className="fa-brands fa-instagram instagram-bg"></i></Link>
                                    <Link to="https://youtube.com/@rrfarming2020?si=ZWgLdwKOJUuBbfbG" target="_blank"><i className="fa-brands fa-youtube youtube-bg"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Useful Links</h3>
                                </div>
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/aboutus">About</Link></li>
                                    <li><Link to="/category">Categories</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>


                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Subscribe</h3>
                                </div>
                                <div className="footer-text mb-25">
                                    <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                </div>
                                <div className="subscribe-form">
                                    <form action="#">
                                        <input type="text" placeholder="Email Address" />
                                        <button><i className="fab fa-telegram-plane"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                            <div className="copyright-text text-center">
                                <p className='text-center'>Copyright &copy; 2024, All Right Reserved By <Link to="https://linktr.ee/abubakarnangri">Abu Bakar Siddique</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
