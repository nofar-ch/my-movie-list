import { Component } from 'react';
import api from '../api';
import starIcon from '../images/star.png'
import yellowStarIcon from '../images/yellowStar.png'
import { connect } from 'react-redux';
import './styles.css'

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {movie: null, imageUrl: null}
    }

    componentDidMount = () => {
        if(sessionStorage.getItem('curUser') === null) {
            this.props.history.push('/');
        }
        const id = this.props.match.params.id;
        api.getMovieDetails(id)
        .then(data => this.setState({movie: data}))
    }

    iconFavoriteClicked = (icon) => {
        const movie = {movie: this.state.movie};
        // favorite
        if(icon === "star") {
            this.props.dispatch({
                type: 'ADD', movie
            })
        }
        // remove favorite
        else {
            const id = this.state.movie.id
            this.props.dispatch({
                type: 'REMOVE', id
            })
        }           
    }

    render () {
            if(this.state.movie) {
                return(
                    <div className="movieDetails">
                         <div className="favoriteIcon">
                        {
                            this.props.data.favoriteList !== undefined &&
                            this.props.data.favoriteList
                            .filter(element => element.movie.id === this.state.movie.id).length > 0 ?
                            <img src={yellowStarIcon} onClick={() => this.iconFavoriteClicked("yellowStar")}/>
                            : <img src={starIcon} onClick={() => this.iconFavoriteClicked("star")}/>
                        }                             
                         </div>
                        <h3>{this.state.movie.original_title}</h3>
                        <img src={`https://image.tmdb.org/t/p/w185/${this.state.movie.poster_path}`} />
                        <span>{this.state.movie.overview}</span>
                        <h4>Rating: {this.state.movie.vote_average}</h4> 
                        </div> 
                    )}
            else
                return <div>No Details</div>
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(MovieDetails);