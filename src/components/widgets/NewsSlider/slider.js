import React, { Component } from 'react';

import {firebase, firebaseArticles, firebaseLooper} from '../../../firebase'
import './slider.sass'

import SliderTemplate from './sliderTemplate/sliderTemplate'


class NewsSlider extends Component {

    state = {
        news: []
    }

    componentDidMount() {

        firebaseArticles.limitToLast(this.props.amount).once('value')
        .then((snapshot)=> {
            const news = firebaseLooper(snapshot)

            const asycnFunction = (item, i, cb) => {
                if(item.image.length > 7){
                    firebase.storage().ref('images')
                    .child(item.image)
                    .getDownloadURL()
                    .then(url => {
                        news[i].image = url
                        cb()
                        }
                    )
                }else{
                    news[i].image = `/image/articles/${item.image}`
                    cb()
                }
                
            }   
            

            let requests = news.map((item, i) =>{
                return new Promise((resolve) => {
                    asycnFunction(item, i, resolve)
                })
            })

            Promise.all(requests).then(() => {
                this.setState({
                    news
                })
            })
        })

    }

    render() {
        
        return (
            <div>
                <SliderTemplate news = {this.state.news}
                    nextButtonText={`Next`}
                    prevButtonText={`Prev`}
                    slideWidth= {window.innerWidth || document.body.clientWidth}
                    items={this.props.amount}
                />
                
            </div>
        );
    }
}

export default NewsSlider;