import React from 'react';

import SideNav from './SideNav/sideNav'

import './header.sass'

import FontAwesome from 'react-fontawesome'

const Header = (props) =>{


    const navBars = () => (
        <div className="bars">
            <FontAwesome 
            name='bars'
            onClick={props.onOpenNav}
            />
        </div>
    )
        
    return (
        <header className="header">
            <SideNav {...props}/>
            <div className="header__item">
                {navBars()}
                {props.logo}

            </div>
        </header>
    );
    
}

export default Header;