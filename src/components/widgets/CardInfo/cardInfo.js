import React from 'react'
//import {Link} from 'react-router-dom'
//import FontAwesome from 'react-fontawesome'

const CardInfo = (props) =>{

    const teamSort = () => {
        let template;
        
        template = props.teams.map((item) => {
            let returnValue = []
            
            if(props.team === item.id)
            {
                returnValue = (
                    <div key={item.id}>
                        <div className="news__team">{item.name}</div>
                        <span className="news__date"> {props.date}</span>
                    </div>
                    )
            }
            return returnValue
        })
        return template
    }

    

    return(
        <div className='news__list--videos'>

            {teamSort()}
        </div>
    )


}

export default CardInfo