import React, {Component} from 'react'

import {firebaseVideos, firebaseTeams, firebaseLooper, firebaseDB} from '../../../../firebase'
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
        firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
        .then((snapshot) => {
            let article = snapshot.val();
            console.log(`team : ${article.team}`)
            firebaseTeams.orderByChild("id").equalTo(article.team+1).once('value')
            .then((snapshot) =>{
                const team = firebaseLooper(snapshot)

                this.setState({
                    article,
                    team
                })
                this.getRelated()
            })
        })
    }

    getRelated = () => {

        firebaseTeams.once('value')
        .then((snapshot)=>{
            let teams = firebaseLooper(snapshot)
            
            firebaseVideos.orderByChild("team").equalTo(this.state.article.team)
            .limitToFirst(3)
            .once('value')
            .then((snapshot) => {
                const related = firebaseLooper(snapshot)
                this.setState({
                    related,
                    teams
                })
            })
        })

    }

    render(){
        const article = this.state.article
        const team = this.state.team
        console.log(this.state.article.url)
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