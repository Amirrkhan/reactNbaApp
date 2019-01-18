import React, { Component } from 'react';
import { Switch} from  'react-router-dom'

import Home from './components/Home/home'
import Layout from './hoc/Layout/layout'
import NewsArticle from './components/articles/News/Post/index'
import VideosArticle from './components/articles/Videos/Video/index'
import NewsMainPage from './components/pages/News/index'
import VideosMainPage from './components/pages/Videos/index'
import SignIn from './components/signin/signIn'
import Dashboard from './components/pages/Dashboard/index'
import PrivateRoute from './components/AuthRoutes/privateRoute'
import PublicRoute from './components/AuthRoutes/publicRoute'

class Routes extends Component {
    render() {
        
        return (
            <Layout user= {this.props.user}>
                <Switch>
                    <PublicRoute {...this.props} restricted={false} path="/" exact component={Home}/>
                    <PublicRoute {...this.props} restricted={false} path="/article/:id" exact component={NewsArticle}/> 
                    <PublicRoute {...this.props} restricted={false} path="/videos/:id" exact component={VideosArticle}/>
                    <PublicRoute {...this.props} restricted={false} path="/news" exact component={NewsMainPage}/>
                    <PublicRoute {...this.props} restricted={false} path="/videos" exact component={VideosMainPage}/>
                    <PublicRoute {...this.props} restricted={true} path="/sign-in" exact component={SignIn}/>
                    <PrivateRoute {...this.props} path="/dashboard" exact component={Dashboard}/>
                </Switch>
            </Layout>
        );
    }
}

export default Routes;  