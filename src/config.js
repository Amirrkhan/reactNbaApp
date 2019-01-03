import {Link} from 'react-router-dom'
import React from 'react'
import FontAwesome from 'react-fontawesome'

const CURRENT_YEAR = (new Date()).getFullYear()
const URL = 'http://localhost:3001/'

function cardTemplate(type, itemId, i,  itemTitle, itemTeam, style, itemImage=''){
    if(type === 'news'){
        return(
            <div className="news__item news__item--card" style={style} key={i} id={`news-item${i}`}>
                <div className="news__info">
                    
                
                    <Link to={`/article/${itemId}`}>
                        {itemTeam}
                        <h2>{itemTitle}</h2>    
                    </Link>
                    
                </div>
            </div>
        )
    }
    else if(type === 'videos')
        return(
            <div className="news__item news__item--videos" style={style} key={i} id={`news-item${i}`}>
                <div className="news__info">

                    <Link to={`/videos/${itemId}`}>
                        <div className="video__image">
                            <img src={`/images/videos/${itemImage}`} alt=""/>
                            <FontAwesome name='play'/>
                        </div>
                        <div style={{marginTop:'2px'}}>
                            {itemTeam}
                            <h2>{itemTitle}</h2>
                        </div>    
                    </Link>
                    
                </div>
            </div>
        )
    else if (type === 'newsWithImage')
        return(
            <div className="news__item news__item--image" style={style} key={i} id={`news-item${i}`}>

                <div className="news__image"
                     style={{backgroundImage:`url(/images/articles/${itemImage})`}}
                >

                </div>

                <div className="news__info">
                    <Link to={`/article/${itemId}`}>
                        {itemTeam}
                        <h2>{itemTitle}</h2>    
                    </Link>
                    
                </div>
            </div>
        )
}

export {
    CURRENT_YEAR,
    URL,
    cardTemplate,
}