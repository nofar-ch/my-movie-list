import React, { Component } from 'react';
import MovieList from '../movieList/movielist';
import MovieDetails from '../movieDetails/movieDetails';
import Login from '../login/login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './styles.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <Router basename="/my-movie-list">
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/movies" component={MovieList}></Route>
                        <Route path="/:id/movie" component={MovieDetails}></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Dashboard;