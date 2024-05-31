import React, { useState, useEffect } from 'react';
import CSS from './Header.module.css';
import { Link, json } from 'react-router-dom';
import RR_Logo from '../../images/RR192.png';
import Login from '../../pages/Login/Login'
import axios from 'axios';
import { backedUrl } from '../../apiUrl';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [length, setLength] = useState(0);
    useEffect(() => {
        const storedListString = sessionStorage.getItem('listOfObjects');
        const storedList = storedListString ? JSON.parse(storedListString) : [];
        getCartItems()
        
    }, [])
    const getCartItems = async () => {
        try {
            let ifUser = localStorage.getItem("buyer");
            ifUser = JSON.parse(ifUser)
            let { data } = await axios.get(`${backedUrl}/api/getCartItems/${ifUser._id}`);
            console.log("data", data.data.cartItems.length)
             setLength(data.data.cartItems.length || 0);

        } catch (error) {
            console.log("err", error)
        }
    };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    let ifUser = localStorage.getItem("buyer");
    if (ifUser !== "undefined") {
        ifUser = JSON.parse(ifUser);
    }

    const toggleLoginPopup = () => {
        setShowLoginPopup(!showLoginPopup);
    };

    function Logout() {
        localStorage.removeItem("buyer");
        window.location.reload()
    }
    return (
        <header className={CSS.header}>
            <div className={CSS.navBar}>
                <div className={CSS.logos}>
                    <Link className={CSS.logo} to={'/'}>
                        <img className={CSS['RR-logo']} src={"RR192.png"} alt='RR Farming' />
                    </Link>
                </div>
                <ul className={CSS.links}>
                    <li className={CSS.items}><Link className={`${CSS.navItem} ${CSS.active}`} to={'/'}>Home</Link></li>
                    <li className={CSS.items}><Link className={CSS.navItem} to={'/category'}>Categories</Link></li>
                    <li className={CSS.items}><Link className={CSS.navItem} to={'/contact'}>Contact</Link></li>
                    <li className={CSS.items}><Link className={CSS.navItem} to={'/aboutus'}>About</Link></li>
                </ul>
                <div className={CSS['cart-login-container']}>
                    <Link to={'/checkout'} className={CSS.action_btn}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className={CSS['cart-length']}>{length && length}</span>
                    </Link>
                    <div className={CSS.action_btn} onClick={ifUser === null ? toggleLoginPopup : Logout}>
                        {ifUser === null ? <i className="fa-solid fa-user"></i> : <span>Logout</span>}
                    </div>

                </div>
                <div className={CSS.toggle_btn} onClick={toggleMenu}>
                    <i className={isOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'}></i>
                </div>
            </div>
            <div className={`${CSS.dropdown_menu} ${isOpen ? CSS.open : ''}`}>
                <li className={CSS.items}><Link className={`${CSS.navItem} ${CSS.active}`} to={'/'}>Home</Link></li>
                <li className={CSS.items}><Link className={CSS.navItem} to={'/category'}>Categories</Link></li>
                <li className={CSS.items}><Link className={CSS.navItem} to={'/contact'}>Contact</Link></li>
                <li className={CSS.items}><Link className={CSS.navItem} to={'/aboutus'}>About</Link></li>
                <li onClick={toggleLoginPopup} className={CSS.items}><Link className={CSS.action_btn} >Login</Link></li>
            </div>
            {showLoginPopup && (
                <div className={CSS.login_popup}>
                    <Login toggleLoginPopup={toggleLoginPopup} />
                    <div className={CSS.close_popup} onClick={toggleLoginPopup}>
                        <span className={CSS.close_popup_btn}>&times;</span>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
