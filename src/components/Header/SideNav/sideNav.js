import React from 'react';

import SideNav from 'react-simple-sidenav'
import SideNavItem from './sideNav-items'

const SideNavigation = (props) => {

    const items = [
        {
            type: 'menu__link',
            icon: 'home',
            text: 'Home',
            link: '/'
        },
        {
            type: 'menu__link',
            icon: 'file-text-o',
            text: 'News',
            link: '/news'
        },
        {
            type: 'menu__link',
            icon: 'play',
            text: 'Videos',
            link: '/videos'
        },
        {
            type: 'menu__link',
            icon: 'sign-in',
            text: 'Sign in',
            link: '/sign-in'
        },
        {
            type: 'menu__link',
            icon: 'sign-out',
            text: 'Sign out',
            link: '/sign-out'
        }
    ]

    return (
        <div>
            <SideNav
                navClass={props.className}
                showNav = {props.showNav}
                onHideNav = {props.onHideNav}
                onOpenNav = {props.onOpenNav}
                navStyle={{
                    background: '#242424',
                    maxWidth: '220px'
                }}
            >
                <SideNavItem items = {items} onHideNav = {props.onHideNav}/>
            </SideNav>
        </div>
    );
}
export default SideNavigation