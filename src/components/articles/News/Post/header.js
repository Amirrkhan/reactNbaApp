import React from 'react';

import TeamNfo from '../../Elements/teamNfo'

const Header = (props) => {

    const teamInfo = (team) => {
        return team ? (<TeamNfo team={team}/>) : null
    }

    return (
        <div className='article__header'>
            <div className="article__item">
                {teamInfo(props.teamData)}
            </div>
            
            <div className="article__item">
                <span className="article__date">Date:</span> {props.date} 
                <br/>
                <span className="article__author">Author: </span> {props.author}
            </div>
        </div>
    )
};

export default Header;