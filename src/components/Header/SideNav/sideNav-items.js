import React from 'react';
import {Link, withRouter} from 'react-router-dom'

import {firebase} from '../../../firebase'

import FontAwesome from 'react-fontawesome'

const SideNavItem = (props) => {

    const items = [
        {
            type: 'menu__link',
            icon: 'home',
            text: 'Home',
            link: '/',
            login: ''
        },
        {
            type: 'menu__link',
            icon: 'file-text-o',
            text: 'News',
            link: '/news',
            login: ''
        },
        {
            type: 'menu__link',
            icon: 'play',
            text: 'Videos',
            link: '/videos',
            login: ''
        },
        {
            type: 'menu__link',
            icon: 'sign-in',
            text: 'Dashboard',
            link: '/dashboard',
            login: false
        },
        {
            type: 'menu__link',
            icon: 'sign-in',
            text: 'Sign in',
            link: '/sign-in',
            login: true
        },
        {
            type: 'menu__link',
            icon: 'sign-out',
            text: 'Sign out',
            link: '/sign-out',
            login: false
        }
    ]
    
    const element = (item, i) => {
        return (
            <div key={i} className="menu">
                <Link to={item.link} className={item.type}>
                    <FontAwesome name={item.icon}/>
                    {item.text}   
                </Link>
            </div>
        )
    }

    const restricted = (user, item, i) => {
        let template = ''
        
       if(user === null && item.login ){
            template = element(item, i)
        } 
        
        if (user !== null && !item.login){
            if(item.link === '/sign-out') {
                template = <div key={i} className="menu">
                                <a  className={item.type}
                                      onClick= {signOut}                                   
                                >
                                    <FontAwesome name={item.icon}/>
                                    {item.text}   
                                </a>
                            </div> 
                
            }
            else{
                template = element(item, i)
            }
        }
        
        
        return template
    }

    const signOut = () => {
        firebase.auth().signOut().then(function() {
            props.history.push("/")
            console.log('Signed Out');
        }, function(error) {
            console.error('Sign Out Error', error);
        });
    }

    const showItems = () => {
        return items.map((item, i) => {
            return item.login !== '' ? 
            restricted(props.user,item, i)
            :
            element(item, i)
        })
    }

    return (
        <div className='menu' onClick={props.onHideNav}>
            {showItems()}
        </div>
    );
}
export default withRouter(SideNavItem)
