import React from 'react';
import CardInfo from '../../CardInfo/cardInfo'



import {cardTemplate} from '../../../../config'

class VideoListTemplate extends React.Component{

    createTemplateCard = (type) => {
        let template = null;
        
        switch (type) {
            case ('card'):
                template = this.props.videos.map((item, i) => 
                    (cardTemplate('videos',
                        item.id, i, item.title, <CardInfo  teams={this.props.teams} team={item.team} date={item.date} />, null, item.image, item.team))
                )
                break;
        
            default:
                template = null
                break;
        }
        return template
    }

    render(){
        return (
            <div className='videolist__items'>
                {this.createTemplateCard(this.props.type)}
            </div>
        );
    }
};


export default VideoListTemplate;