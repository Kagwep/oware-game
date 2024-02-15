import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Scroll from 'react-scroll';
import '../css/Header.scss';
import '../css/Navbar.scss';
import logo from '../assets/images/logo.png'
import { useAppContext } from "../providers/AppProvider";
import { modals } from '@mantine/modals'
import { Text,Button } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'


const Navbar = () => {

    const { address, connection, handleConnetWalletBtnClick, contract,handleWalletDisconnect,disconnectWallet} = useAppContext()

    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleLang, setToggleLang] = useState(false);
    const [toggleMenuScroll, setToggleMenuScroll] = useState(false);
    const [toggleSkewMenu, settoggleSkewMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const ScrollLink = Scroll.Link;
    const handleToggleMenu = () =>{
        setToggleMenu(!toggleMenu);
        settoggleSkewMenu(!toggleSkewMenu);
    };

    const handleToggleLangContainer = () =>{
        setToggleLang(!toggleLang);
    };
    

    document.addEventListener('scroll', ()=>{
        if (window.scrollY > 600) {
            setToggleMenuScroll(true);
        }else{
            setToggleMenuScroll(false);
        }
    });

    const handleDisconnect = () => {
        // Perform the logic to disconnect the wallet here
        // For example: disconnectWallet();
        console.log('Disconnecting wallet...');
        // Close the modal after performing the disconnect action
        setShowModal(false);
        disconnectWallet();
      };

    return (
        <div className="nav-container m-auto">
            <nav className="navbar">
                <ScrollLink to="main" className="logo">
                    <img src={logo} alt="Logo" className="logo"/>
                </ScrollLink>
                <div className={`menu-toggle ${toggleMenu ? 'is-active':''} 
                ${toggleMenuScroll ? 'scrolled':''} ${toggleSkewMenu ? 'active':''}`} 
                id="mobile-menu" onClick={handleToggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <ul className={`nav-menu ${toggleMenu ? 'active showMenu':''}`}>
                    <li >
                        <ScrollLink  
                            to="main" 
                            className="nav-links active-link"
                            spy={true} 
                            smooth={true} 
                            duration={500}
                        >Main</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink 
                            to="about" 
                            className="nav-links"
                            spy={true} 
                            smooth={true} 
                            duration={500}
                        >
                        About</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink 
                            to="gamefeature" 
                            className="nav-links"
                            spy={true} 
                            smooth={true} 
                            duration={500}
                        >
                        Game Feature</ScrollLink >
                    </li>
                    <li>
                        <ScrollLink 
                            to="systemrequirements" 
                            className="nav-links"
                            spy={true} 
                            smooth={true} 
                            duration={500}
                        >
                        System Requirements</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink 
                            to="quotes" 
                            className="nav-links"
                            spy={true} 
                            smooth={true} 
                            duration={1000}
                            >
                            Quotes</ScrollLink>
                    </li>
                    <li>
                        <Link to="/claim-token"  className='nav-links'>
                            Claim token
                        </Link>
                    </li>
{/* 
                    <div className="container-sponsor-inside-nav-menu">
                        <Link to="#">
                            <img src={XboxIcon} alt=""/>
                        </Link>
                        <Link to="#">
                            <img src={Steam} alt=""/>
                        </Link>

                    </div> */}

                </ul>

                <div className="lang-container">
                    <div className="current-lang">
                        <span className="current-lang__name">ENG</span> 
                        <span className="current-lang__toggle" onClick={handleToggleLangContainer}>
                            <i className="uil uil-angle-down"></i>
                        </span>
                    </div>
                    <div className={`lang-option ${toggleLang ? 'active' : ''}`}>
                        <span className="lang-russ">RUS</span>
                        <span className="lang-fra">FRA</span>
                        <span className="lang-deu">DEU</span>
                    </div>
                </div>

                <div>
                    {connection ? (
                        <>
                            {/* <p>Connected Account: {account}</p> */}
                            <button onClick={() => setShowModal(true)} className="bg-amber-500 hover:bg-amber-300 text-white text-xl font-bold py-2 px-4 border border-amber-500 rounded">Disconnect Wallet</button>
                        </>
                    ) : (
                        <button onClick={handleConnetWalletBtnClick} className="bg-amber-600 hover:bg-amber-300 text-white text-xl font-bold py-2 px-4 border border-amber-700 rounded">Connect Wallet</button>
                    )}
                    {/* Your React component content here */}
                </div>

                {/* <div className="container-sponsor">
                    <Link to="#">
                        <img src={XboxIcon} alt=""/>
                    </Link>
                    <Link to="#">
                        <img src={Steam} alt=""/>
                    </Link>

                </div> */}


                


            </nav>

            {showModal && (
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-green-500">Please confirm your action</h3>
                    <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                    >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                    </button>
                </div>
                <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blue-500 text-lg leading-relaxed">
                    Are you sure you want to disconnect your account?
                    </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                    >
                    Cancel
                    </button>
                    <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDisconnect}
                    >
                    Disconnect
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        {showModal && <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}
        </div>
    );   
}

export default Navbar;