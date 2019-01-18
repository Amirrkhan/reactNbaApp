import React, { Component } from 'react';

import Button from '../../button/button'

import NewsTemplate from './newsTemplate/newsTemplate'
import {firebaseArticles, firebaseTeams, firebaseLooper} from '../../../firebase'
import './newsList.sass'


class NewsList extends Component {

    state = {
        teams: [],
        news: [],
        end: this.props.start + this.props.amount,
        style: {transform: 'translateX(0)'}
    }

    getData = (database, start, amount) => {

        if (this.state.teams.length < 1){
            firebaseTeams.once('value')
            .then((snapshot)=>{
                const teams = firebaseLooper(snapshot)
                this.setState({
                    teams
                })
            })
        }

        database.orderByChild('id').startAt(start).limitToFirst(amount).once('value')
        .then((snapshot) => {
            const news = firebaseLooper(snapshot)
            this.setState({
                news
            })
        })
    }

    componentDidMount() {
        
        this.getData(firebaseArticles, this.props.start, this.state.end)
        
    }

    loadMoreNews = () => {
        let end = this.state.end + (this.props.amount-1)
        let start = this.state.end

        this.getData(firebaseArticles, start, end)

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