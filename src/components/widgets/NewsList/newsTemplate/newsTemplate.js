import React, { Component } from 'react';
import {cardTemplate} from '../../../../config'
import CardInfo from '../../CardInfo/cardInfo'


class NewsTemplate extends Component {

    newsWidgetCreate = (type)=>{
        let template = null;
        switch(type){
            case('card'):
                template = this.props.news.map((item, i)=>
                    
                    (cardTemplate('news',item.id, i, item.title, <CardInfo teams={this.props.teams} team={item.team} date={item.date}/>, this.props.style))
                    
                )
            break;
            case('cardWithImage'): 
                template = this.props.news.map((item, i) =>
                (
                    cardTemplate('newsWithImage', item.id, i, item.title, <CardInfo teams={this.props.teams} team={item.team} date={item.date}/>, this.props.style, item.image))
                )
            break;
            default:
                template =  null

        }
       
        return template
    }

    


    render() {
        return (
            <div className='news__item--wrapper'>
                {this.newsWidgetCreate(this.props.type)}
            </div>
        );
    }
}

export default NewsTemplate;