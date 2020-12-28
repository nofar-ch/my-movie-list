import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../api';
import yellowStarIcon from '../images/yellowStar.png'
import './styles.css';

class MovieList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movieList: [],
            favoriteList: []
        }
    }

    componentDidMount = () => {
        if(sessionStorage.getItem('curUser') === null) {
            this.props.history.push('/');
        }
        this.setState({favoriteList: this.props.data.favoriteList})
        api.getPopularMovies()
        .then(data => this.setState({movieList: data}))
    }

    movieClicked = (id) => {
        api.getMovieDetails(id)
        .then(() => this.props.history.push(`/${id}/movie`)) 
    }

    openFavoriteList = () => {
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
        modal.style.display = "none"; 
        } 
    }

    render() {
            return (
                <div>        
                   <div className="header">
                   <div className="starsNumber"><img src={yellowStarIcon}/>
                        <span className="number">{this.state.favoriteList.length}</span>
                    </div>
                       <h3>Movie List:</h3>
                    <input type="button" id="favoriteListBtn" value="Favorite List" onClick={() => this.openFavoriteList()}/> 
                    </div>
                    <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close">&times;</span>
                        <h4>Favorite Movies:</h4>
                        <ul>
                        {
                            this.state.favoriteList !== undefined ?
                             this.state.favoriteList.map((item, index) => {
                                return <li key={index}>{item.movie.original_title}</li>
                            }): null
                        }
                        </ul>
                    </div>
                    </div>
                    <ul className="w3-ul">
                    {
                        this.state.movieList.map((item, index) => {
                            return <div className="liBtn"  key={index} >
                                        <li onClick={() => this.movieClicked(item.id)}>{item.original_title}</li>
                                    </div>
                        })
                    }
                    </ul>
                </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(MovieList);
