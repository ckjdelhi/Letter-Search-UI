import React, { Component } from "react";
import './Search.css';
import Loader from '../loader.gif';
import PageNavigation from './PageNavigation';
import MediaCard from './MediaCard';
let searchData = require('./data.json');

export default class Home extends Component {
  constructor( props ) {
		super( props ); 
		this.state = {
			query: '',
			results: {},
			loading: false,
			message: '',
			totalResults: 0,
			totalPages: 0,
			currentPageNo: 0,
		};
	}
	getPageCount = ( total, denominator ) => {
		const divisible	= 0 === total % denominator;
		const valueToBeAdded = divisible ? 0 : 1;
		return Math.floor( total/denominator ) + valueToBeAdded;
	};

	fetchSearchResults = ( updatedPageNo = '', query ) => {
		const total = searchData.total;
		const totalPagesCount = this.getPageCount( total, 10 );
		
		const matches = searchData.hits.filter(s => s.tags.includes(query));
		const resultNotFoundMsg = ! matches.length
								? 'There are no more search results. Please try a new search'
								: '';

		this.setState( {
			results: matches,
			message: resultNotFoundMsg,
			totalResults: total,
			totalPages: totalPagesCount,
			currentPageNo: updatedPageNo,
			loading: false
		} )
	};

	handleOnInputChange = ( event ) => {
		const query = event.target.value;
		if ( ! query ) {
			this.setState( { query, results: {}, message: '', totalPages: 0, totalResults: 0 } );
		} else {
			this.setState( { query, loading: true, message: '' }, () => {
				this.fetchSearchResults( 1, query );
			} );
		}
	};
	handlePageClick = ( type ) => {
		const updatePageNo = 'prev' === type
			? this.state.currentPageNo - 1
			: this.state.currentPageNo + 1;

		if( ! this.state.loading  ) {
			this.setState( { loading: true, message: '' }, () => {
				this.fetchSearchResults( updatePageNo, this.state.query );
			} );
		}
	};

	renderSearchResults = () => {
		const { results } = this.state;

		if ( Object.keys( results ).length && results.length ) {
			return (
				<div className="results-container">
					{ results.map( result => {
						return (
							<a key={ result.id } href={ result.largeImageURL } className="result-item">
								<MediaCard data={result} openLetter={() => this.openLetter()}/>
							</a>
						)
					} ) }

				</div>
			)
		}
	};
	render() {
		const { query, loading, message, currentPageNo, totalPages } = this.state;

		const showPrevLink = 1 < currentPageNo;
		const showNextLink = totalPages > currentPageNo;

		return (
			<div>
				<h2 className="heading">Outbound Letter Search</h2>
			<label className="container search-label" htmlFor="search-input">
				<input
					type="text"
					name="query"
					value={ query }
					id="search-input"
					placeholder="Search letter..."
					onChange={this.handleOnInputChange}
				/>
				<i className="fa fa-search search-icon" aria-hidden="true"/>
			</label>
			{message && <p className="container message">{ message }</p>}
			<img src={ Loader } className={`search-loading ${ loading ? 'show' : 'hide' }`} alt="loader"/>
			<PageNavigation
				loading={loading}
				showPrevLink={showPrevLink}
				showNextLink={showNextLink}
				handlePrevClick={ () => this.handlePageClick('prev')}
				handleNextClick={ () => this.handlePageClick('next')}
			/>
			{ this.renderSearchResults() }
			<PageNavigation
				loading={loading}
				showPrevLink={showPrevLink}
				showNextLink={showNextLink}
				handlePrevClick={ () => this.handlePageClick('prev')}
				handleNextClick={ () => this.handlePageClick('next')}
			/>
			</div>
		)
	}
}
