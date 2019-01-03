import React, { Component } from 'react';

import SideNav from './SideNav/sideNav'

import './header.sass'

import FontAwesome from 'react-fontawesome'

class Header extends Component {


    state = {

    }

    navBars = () => (
        <div className="bars">
            <FontAwesome 
            name='bars'
            onClick={this.props.onOpenNav}
            />
        </div>
    )
        
    

    render() {
        return (
            <header className="header">
                <SideNav {...this.props}/>

                <div className="header__item">
                    {this.navBars()}
                    {this.props.logo}
                </div>
            </header>
        );
    }
}

export default Header;