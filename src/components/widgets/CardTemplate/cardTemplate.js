import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

class cardTemplate extends Component {

    state = {
        imageUrl: ''
    }

    renderTemplate = (type, itemId, i,  itemTitle, itemTeam, style, itemImage='') => {
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
                         style={{backgroundImage:`${this.state.url}`}}
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

    render() {
        console.log(this.props)
        return (
            <div>
                {this.renderTemplate(this.props.type)}
            </div>
        );
    }
}

export default cardTemplate;