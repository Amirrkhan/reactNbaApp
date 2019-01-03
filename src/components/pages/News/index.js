import React, { Component } from 'react';

import NewsSlider from '../../widgets/NewsSlider/slider'
import NewsList from '../../widgets/NewsList/NewsList'

class NewsMainPage extends Component {
    render() {
        return (
            <div className="content--news">
                <NewsSlider
                    start={0}
                    amount={6}
                    nameBaseFrom={`articles`}
                    setting={
                        []
                    }
                />
                <NewsList
                    type="cardWithImage"
                    start={0}
                    amount={2}
                    nameBaseFrom={`articles`}
                    loadmore = {true}
                    loadmoreText = 'Load more news'
                />


            </div>
        );
    }
}

export default NewsMainPage;