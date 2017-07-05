import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import SearchBox, { SearchResults, SearchInputBox, SearchResultItem } from './SearchBox';

const wrapper = shallow(<SearchBox />);

it('Has an input box', () => {
	expect(wrapper.find('SearchInputBox').length).toBe(1);
});

it('Displays search results', () => {
	const movies = [
		{
			title : 'movie title 1',
			poster_path : 'posterpath.jpg',
			vote_average : 5
		},
		{
			title : 'movie title 2',
			poster_path : 'posterpath.jpg',
			vote_average : 3
		},
		{
			title : 'movie title 3',
			poster_path : 'posterpath.jpg',
			vote_average : 4
		}
	];
	const searchResults = shallow(<SearchResults movies={movies} />);
	expect(searchResults.find('SearchResultItem').length).toBe(3);
});

it('Filters movies without poster', () => {
	const movies = [
		{
			title : 'movie title 1',
			poster_path : 'posterpath.jpg',
			vote_average : 5
		},
		{
			title : 'movie title 2',
			poster_path : null,
			vote_average : 3
		},
		{
			title : 'movie title 3',
			poster_path : 'posterpath.jpg',
			vote_average : 4
		}
	];
	const searchResults = shallow(<SearchResults movies={movies} />);
	expect(searchResults.find('SearchResultItem').length).toBe(2);
});

it('Filters adult movies', () => {
	const movies = [
		{
			title : 'Adult movie 1',
			poster_path : 'posterpath.jpg',
			vote_average : 5,
			adult : true
		},
		{
			title : 'movie title 2',
			poster_path : 'posterpath.jpg',
			vote_average : 3,
			adult : false
		},
		{
			title : 'movie title 3',
			poster_path : 'posterpath.jpg',
			vote_average : 4,
			adult : false
		}
	];
	const searchResults = shallow(<SearchResults movies={movies} />);
	expect(searchResults.find('SearchResultItem').length).toBe(2);
});