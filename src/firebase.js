import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAirKXuOuGHklS-6bvz1XqS0Xgjd6QCHxg",
    authDomain: "nba-full-1faf0.firebaseapp.com",
    databaseURL: "https://nba-full-1faf0.firebaseio.com",
    projectId: "nba-full-1faf0",
    storageBucket: "nba-full-1faf0.appspot.com",
    messagingSenderId: "314640536955"
};

firebase.initializeApp(config)

const firebaseDB = firebase.database()
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = []

    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })
    return data;
}

export{
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper, 
}