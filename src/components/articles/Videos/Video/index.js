import React, {Component} from 'react'

import axios from 'axios'

import {URL} from '../../../../config'
import Header from './header'
import '../../articles.sass'

import VideoListTemplate from '../../../widgets/VideoList/videoListTemplate/videoListTemplate'


class VideosArticle extends Component{

    state = {
        article: [],
        team: [],
        teams: [],
        related: []
    }

    componentWillMount(){
        axios.get(`${URL}videos?id=${this.props.match.params.id}`)
        .then(response => {
            let article = response.data[0]

            axios.get(`${URL}teams?id=${article.team}`)
            .then(response => {
                console.log()
                this.setState({
                    article,
                    team: response.data
                })
                
                    this.getRelated();
                })
                
            })
    }

    getRelated = () => {
        
        axios.get(`${URL}teams`)
        .then( response => {
            let teams = response.data
            
            axios.get(`${URL}videos?q=${this.state.team[0].city}&_limit=3`)
            .then(response => {
                
                this.setState({
                    teams,
                    related: response.data
                })
            })
        })

    }

    loadmore = () => {

    }

    render(){
        const article = this.state.article
        const team = this.state.team
        console.log(this.state.related)

        return(
            <div className="article article--videos">
                <Header teamData = {team} 
                />

                <div className="article__body">
                    <h1 className="article__title">{article.title}</h1>
                    <iframe 
                        title="videoplayer"
                        width='100%'
                        height="300px"
                        src={`https://www.youtube.com/embed/${this.state.article.url}`}
                    >

                    </iframe>
                </div>
                <div className="article__related">
                    <VideoListTemplate
                        type='card'
                        teams={this.state.teams}
                        videos={this.state.related}
                        isVideo = {true}
                    />
                </div>
            </div>
        )
    }

}

export default VideosArticle;