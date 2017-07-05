import React, { Component } from 'react';
import axios from 'axios';
import './SearchBox.css';

class SearchBox extends Component {
	constructor() {
		super();
		this.state = {
			movies : [],
			show_results : false
		};
		this.fetchResults = this.fetchResults.bind(this)
	}
	fetchResults(value) {
		if(value === '') {
			this.setState({
				movies : [],
				show_results : false
			});
		} else {
			const api_key = '07a435bd643821239b3f9beb1a1027cb';
			const url = 'https://api.themoviedb.org/3/search/movie?api_key='+api_key+'&language=en-US&page=1&include_adult=false&query=' + value;
			axios.get(url).then(res => {
				const movies = res.data.results;
				this.setState({
					movies : movies,
					show_results : true
				});
			}).catch(function (error) {
				// if I had more time, display <error /> component.
				console.log(error);
			});;
		}
	}
	render() {
		return (
			<div id="searchbox">
				<SearchInputBox fetchResults={this.fetchResults} />
				{this.state.show_results > 0 && <SearchResults movies={this.state.movies} />}
			</div>
		);
	}
}

class SearchInputBox extends React.Component {
	render() {
		return (
			<div>
				<input type="text" ref="searchTerm" placeholder="Search for movie..." onChange={(e) => this.props.fetchResults(e.target.value)} />
			</div>
		);
	}
}

class SearchResults  extends React.Component {
	render() {
		let results = [];
		let movies = this.props.movies;
		
		// remove any movies without a poster
		movies = movies.filter(function (movie) {
			return movie.poster_path != null;
		});

		// remove any movies that are adult films
		movies = movies.filter(function (movie) {
			return movie.adult != true;
		});

		for (let index in movies) {
			results.push(<SearchResultItem movie={movies[index]} key={index} />);
		}
		return (
			<div id="results">
				<ul>{results}</ul>
			</div>
		);
	}
}

class SearchResultItem  extends React.Component {
	render() {
		const movie = this.props.movie;
		return (
			<li>
				<img src={'https://image.tmdb.org/t/p/w154/' + movie.poster_path} alt={movie.title} />{movie.title} ({movie.vote_average})
			</li>
		);
	}
}

export { SearchBox as default, SearchInputBox, SearchResults, SearchResultItem }
