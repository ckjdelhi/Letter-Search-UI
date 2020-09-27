import React, { Component } from "react";
import './Search.css';
import Loader from '../loader.gif';
//import PageNavigation from './PageNavigation';
import MediaCard from './MediaCard';
import Axios from "axios";
//let searchData = require('./data.json');

export default class LetterSearch extends Component {
  constructor() {
		super(); 
		this.state = {
			query: '',
			results: {},
			loading: false,
			message: '',
			totalResults: 0,
			totalPages: 0,
			currentPageNo: 0,
			readData:{}
		};
	}
	componentDidMount(){
		
		Axios.get('http://springbootawsintegration-env.eba-i7iwzqay.us-east-1.elasticbeanstalk.com/files').then(
			resp=> {
				this.setState({readData:resp.data})
			}
		)
		if(this.state.query){
			this.fetchSearchResults( 1, this.state.query );
		}
	}
	getPageCount = ( total, denominator ) => {
		const divisible	= 0 === total % denominator;
		const valueToBeAdded = divisible ? 0 : 1;
		return Math.floor( total/denominator ) + valueToBeAdded;
	};

	fetchSearchResults = ( updatedPageNo = '', query ) => {
		const total = this.state.readData.total;
		const totalPagesCount = this.getPageCount( total, 20 );
		
		let matches = this.state.readData.filter(s => s.tags.toLowerCase().includes(query.toLowerCase()));
		if(!matches.length){
			matches = this.state.readData.filter(s => s.description.toLowerCase().includes(query.toLowerCase()));	
		}
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
							<div className="result-item">
								<MediaCard data={result}/>
							</div>
						)
					} ) }

				</div>
			)
		}
	};
	render() {
		const { query, loading, message} = this.state;
		//const {urrentPageNo, totalPages } = this.state;
		//const showPrevLink = 1 < currentPageNo;
		//const showNextLink = totalPages > currentPageNo;

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
			{ this.renderSearchResults() }
			{/*<PageNavigation
				loading={loading}
				showPrevLink={showPrevLink}
				showNextLink={showNextLink}
				handlePrevClick={ () => this.handlePageClick('prev')}
				handleNextClick={ () => this.handlePageClick('next')}
			/>*/}
			</div>
		)
	}
}
