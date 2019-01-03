import React, { Component } from 'react';

import './slider.sass'

import {URL} from '../../../config'
import SliderTemplate from './sliderTemplate/sliderTemplate'
import axios from 'axios'

class NewsSlider extends Component {

    state = {
        news: []
    }

    componentWillMount() {
        axios.get(`${URL}${this.props.nameBaseFrom}?_start=${this.props.start}&_end=${this.props.amount}`)
        .then( response => {
            this.setState({
                news: response.data
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