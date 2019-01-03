import React from 'react';

import TeamNfo from '../../Elements/teamNfo'

const Header = (props) => {

    const teamInfo = (team) => {
        return team ? (<TeamNfo team={team}/>) : null
    }

    return (
        <div className='article__header'>
            <div className="article__item">
                {teamInfo(props.teamData[0])}
            </div>
        </div>
    )
};

export default Header;