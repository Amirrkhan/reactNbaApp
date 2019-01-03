import React, { Component } from 'react';

import Button from '../../button/button'

import axios from 'axios'
import {URL} from '../../../config'
import NewsTemplate from './newsTemplate/newsTemplate'

import './newsList.sass'


class NewsList extends Component {

    state = {
        teams: [],
        news: [],
        end: this.props.start + this.props.amount,
        style: {transform: 'translateX(0)'}
    }

    getData = (url, baseFromName, start, end) => {

        if (this.state.teams.length < 1){
            axios.get(`${url}teams`).then(response => {
                this.setState({
                    teams: response.data
                })
            })
        }

        axios.get(`${url}${baseFromName}?_start=${start}&_end=${end}`).then(response => {
            this.setState({
                news: [...this.state.news,...response.data]
            })
        })
    }

    componentWillMount() {
        
        this.getData(URL, this.props.nameBaseFrom, this.props.start, this.state.end)
        
    }

    loadMoreNews = () => {
        let start = this.state.end 
        let end = this.state.end + this.props.amount
        this.getData(URL, this.props.nameBaseFrom, start, end )
        this.setState({
            end: this.state.end + this.props.amount
        })
    }


    render() {
        return (
            <div className='news'>
                <NewsTemplate
                    news = {this.state.news}
                    type = {this.props.type}
                    style = {this.state.style}
                    teams = {this.state.teams}
                />
                {this.props.loadmore ? 
                <Button 
                    className='button news__load' 
                    action={this.loadMoreNews} 
                    buttonText = {this.props.loadmoreText}
                /> : null}
            </div>
        );
    }
}

export default NewsList;