import React from 'react';
import './teamInfo.sass'



const TeamNfo = (props) => {
    return (
            <div className="teamInfo">
                <div className="teamInfo__left logo" 
                    style={{backgroundImage:`url(/images/teams/${props.team.logo})`}}
                />
                <div className="teamInfo__right">
                    <div className='teamInfo__name'>
                        <span>{props.team.city} {props.team.name}</span>
                    </div>
                    <div>
                        <strong>
                            W{props.team.stats[0].wins}-L{props.team.stats[0].defeats}
                            {console.log()}
                        </strong>
                    </div>
                </div>
            </div>
    );
};

export default TeamNfo;