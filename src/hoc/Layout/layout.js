import React, { Component } from 'react';

import './layout.sass'

import { Link } from 'react-router-dom'

import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'

class Layout extends Component {

    state = {
        showNav: false
    }

    togglesideNav = (action) => {
        this.setState({
            showNav: action
        })
    }

    logo = () => {
        return(
            <Link to="/" className='logo'>
                <img src="/images/nba_logo.png" alt="home logo"/>
            </Link>
        )
    }

    render() {
        return (
            <div>
                <Header
                    showNav ={this.state.showNav}
                    onHideNav = {() => this.togglesideNav(false)}
                    onOpenNav = {() => this.togglesideNav(true)}
                    logo = {this.logo()}
                />
                {this.props.children}
                <Footer logo = {this.logo()}/>
            </div>
        );
    }
}

export default Layout;