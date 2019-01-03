import React from 'react';
import {Link} from 'react-router-dom'

import FontAwesome from 'react-fontawesome'

const SideNavItem = (props) => {

    

    const showItems = () => {
        return props.items.map((item, i) => {
            return (
                <div key={i} className="menu">
                    <Link to={item.link} className={item.type} onClick={props.onHideNav}>
                        <FontAwesome name={item.icon}/>
                        {item.text}   
                    </Link>
                </div>
            )
        })
    }

    return (
        <div className='menu'>
            {showItems()}
        </div>
    );
}
export default SideNavItem
