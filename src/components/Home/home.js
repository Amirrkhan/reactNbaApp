import React, { Component } from 'react';

import NewsSlider from '../widgets/NewsSlider/slider'
import NewsList from '../widgets/NewsList/NewsList'
import VideoList from '../widgets/VideoList/videolist'

class Home extends Component {
    render() {
        return (
            <div>
                <NewsSlider
                    start={0}
                    amount={3}
                    setting={
                        []
                    }
                />

                <NewsList
                    type='card'
                    start={1}
                    amount={3}
                    nameBaseFrom={`articles`}
                    loadmore = {true}
                    loadmoreText = 'Load more news'
                />

                <VideoList
                    type='card'
                    title={ true}
                    titleText = 'NBA videos'
                    loadmore = {true}
                    start = {1}
                    amount = {3}
                    nameBaseFrom={`videos`}
                />
                
            </div>
        );
    }
}

export default Home;