import React, { Component } from 'react';

import VideoList from '../../widgets/VideoList/videolist'

class VideosMainPage extends Component {
    render() {
        return (
            <div>
                <VideoList
                    type='card'
                    title={ false}
                    loadmore = {true}
                    start = {0}
                    amount = {3}
                    nameBaseFrom={`videos`}
                />
            </div>
        );
    }
}

export default VideosMainPage;