import React, {Component} from 'react'


import Button from '../../button/button'
import VideoListTemplate from './videoListTemplate/videoListTemplate'
import {firebaseTeams, firebaseVideos, firebaseLooper} from '../../../firebase'

import './videoList.sass'

class VideoList extends Component {

    state = {
        end: this.props.start + this.props.amount,
        teams: [],
        videos: []
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
            const videos = firebaseLooper(snapshot)
            this.setState({
                videos: [...this.state.videos, ...videos]
            })
        })
    }

    loadmore = () => {
        let end = this.state.end + (this.props.amount-1)
        let start = this.state.end

        this.getData(firebaseVideos, start, end)

        this.setState({
            end: this.state.end + this.props.amount
        })
    }

    componentWillMount() {
        this.getData(firebaseVideos, this.props.start, this.props.amount )
    }

    render(){
        
        return (
            <div className='videolist'>
                {this.props.title ? (<div className='videolist__title'>{this.props.titleText}</div>): null}
                <VideoListTemplate
                    type={this.props.type}
                    teams={this.state.teams}
                    videos={this.state.videos}
                    isVideo = {true}
                    
                />
                {this.props.loadmore ? 
                    <Button 
                        className='button news__load' 
                        buttonText='Load more videos'
                        action={this.loadmore}
                    /> : null
                    }
            </div>
        )
    }
}

export default VideoList