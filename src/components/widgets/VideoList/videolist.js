import React, {Component} from 'react'
import axios from 'axios'

import Button from '../../button/button'
import {URL } from '../../../config'
import VideoListTemplate from './videoListTemplate/videoListTemplate'

import './videoList.sass'

class VideoList extends Component {

    state = {
        end: this.props.start + this.props.amount,
        teams: [],
        videos: []
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
                videos: [...this.state.videos,...response.data]
            })
        })
    }

    loadmore = () => {
        let end = this.state.end + this.props.amount
        let start = this.state.end

        this.getData(URL, this.props.nameBaseFrom, start, end)

        this.setState({
            end: this.state.end + this.props.amount
        })
    }

    componentWillMount() {
        this.getData(URL, this.props.nameBaseFrom , this.props.start, this.state.end)
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