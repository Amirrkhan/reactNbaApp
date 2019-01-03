import React, { Component } from 'react';
import {Route, Switch} from  'react-router-dom'

import Home from './components/Home/home'
import Layout from './hoc/Layout/layout'
import NewsArticle from './components/articles/News/Post/index'
import VideosArticle from './components/articles/Videos/Video/index'
import NewsMainPage from './components/pages/News/index'
import VideosMainPage from './components/pages/Videos/index'

class Routes extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/article/:id" exact component={NewsArticle}/> 
                    <Route path="/videos/:id" exact component={VideosArticle}/>
                    <Route path="/news" exact component={NewsMainPage}/>
                    <Route path="/videos" exact component={VideosMainPage}/>
                </Switch>
            </Layout>
        );
    }
}

export default Routes;  