import React, {Component} from 'react'

import {firebase, firebaseDB, firebaseLooper, firebaseTeams} from '../../../../firebase'
import Header from './header'
import '../../articles.sass'


class NewsArticle extends Component {

    state = {
        article: [],
        team:[],
        imageURL: ''
    }

    componentWillMount(){
        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot) => {
            let article = snapshot.val();
            firebaseTeams.orderByChild("id").equalTo(article.team+1).once('value')
            .then((snapshot) =>{
                const team = firebaseLooper(snapshot)
                let imageURL = ''
                if(article.image.length > 7){
                    firebase.storage().ref('images')
                    .child(article.image)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({
                            imageURL: url
                        })
                    })
                    
                }else{
                    imageURL = `/images/articles/${article.image}`
                }
                
                this.setState({
                    article,
                    team,
                    imageURL

                })

            })
        })
    }

    render(){
        const article = this.state.article
        const team = this.state.team
        
        return(
            <div className='article article--news'>
                <Header 
                    teamData = {team[0]}
                    date={article.date}
                    author={article.author}
                />
                <div className="article__body">
                    <h1 className="article__title">{article.title}</h1>
                    <div className="article__image"
                        style={{backgroundImage: `url(${this.state.imageURL})`}}
                    />
                    <div className="article__text"
                        dangerouslySetInnerHTML={{
                            __html: article.body
                        }}
                    >
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsArticle