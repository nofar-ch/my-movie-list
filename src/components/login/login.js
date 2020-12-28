import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Profile from '../profile/profile'
import './styles.css';

firebase.initializeApp({
    apiKey: "AIzaSyCmXI7NHHKabA_5cB4Ji6iQ4_fELJWLKA8",
    authDomain: "mymovies-fdb00.firebaseapp.com"
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignIn: false,
            userName: 'Stranger',
            image: null,
            textMessage: 'Please log in to continue to the awesomness'
        }
    }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({isSignIn: true,
                                userName: firebase.auth().currentUser.displayName,
                                image: firebase.auth().currentUser.photoURL})
            sessionStorage.setItem('curUser', user.email)
        }         
    })
    }

    signOut = () => {
        firebase.auth().signOut();
        this.setState({isSignIn: false,
                        userName: 'Stranger',
                        image: null})
        sessionStorage.clear();
    }

    movieListClicked = () => {
        this.props.history.push('./movies')
    }

    render() {
        return (<div>
                 <Profile isSignIn={this.state.isSignIn} userName={this.state.userName} 
                        image={this.state.image} textMessage={this.state.textMessage}/>
                {
                    this.state.isSignIn ? 
                    <div>   
                        <input type="button" value="Movie List" className="movieListBtn" onClick={() => this.movieListClicked()}/>
                        <input type="button" value="Sign out" className="signOutBtn" onClick={() => this.signOut()}/>
                    </div>
                    :
                    <div>
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default Login;