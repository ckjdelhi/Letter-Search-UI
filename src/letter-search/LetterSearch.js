import React, { Component } from "react";
import './Search.css';
import Loader from '../loader.gif';
//import PageNavigation from './PageNavigation';
import MediaCard from './MediaCard';
import Axios from "axios";
//let searchData = require('./data.json');
import {URL} from '../constant/url';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
	flexGrow: 1
  },
  paper: {
	padding: theme.spacing(4),
    textAlign: "center",
	color: theme.palette.text.secondary
  }
}));

class LetterSearch extends Component {

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
		
		Axios.get(URL.searchFiles+'/files').then(
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
		
		const { classes } = this.props;
		const { query, loading, message} = this.state;
		//const {urrentPageNo, totalPages } = this.state;
		//const showPrevLink = 1 < currentPageNo;
		//const showNextLink = totalPages > currentPageNo;

		return (
			<div className={classes.root}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
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
					</Grid>
					<Grid item xs={3}>
					<Box m={2}>
						<Paper className={classes.paper}>
						<label for="cars"><b>Choose Date:</b></label><br/>
						<select name="cars" id="cars">
							<option value="volvo">Last Month</option>
							<option value="saab">Last 3 Months</option>
							<option value="opel">Last 6 Months</option>
							<option value="audi">Last 1 Year</option>
							<option value="audi">More Than 1 Year</option>
						</select><br/><br/>
						<label><b>Member:</b></label><br/>
						<input type="checkbox" id="a" name="a" value="Commercial"/>
  						<label for="a"> Commercial&nbsp;</label>
						  <input type="checkbox" id="Medicaid" name="Medicaid" value="Medicaid"/>
  						<label for="Medicaid"> Medicaid&nbsp;</label>
						  <input type="checkbox" id="Medicare" name="Medicare" value="Medicare"/>
  						<label for="Medicare"> Medicare&nbsp;</label>

						  <br/><br/>
						<label><b>Communication Type:</b></label><br/>
						<input type="checkbox" id="Claim" name="Claim" value="Claim"/>
  						<label for="Claim"> Claim&nbsp;</label>
						  <input type="checkbox" id="Appeal" name="Appeal" value="Appeal"/>
  						<label for="Appeal"> Appeal&nbsp;</label>
						  <input type="checkbox" id="Precertification" name="Precertification" value="Precertification"/>
  						<label for="Precertification"> Precertification&nbsp;</label><br/>
						  <input type="checkbox" id="Denial" name="Denial" value="Denial"/>
  						<label for="Denial"> Denial   &nbsp;</label>
						  <input type="checkbox" id="Benefit" name="Benefit" value="Benefit"/>
  						<label for="Benefit"> Explanation of Benefit</label>
						</Paper>
						</Box>
					</Grid>
					<Grid item xs={9}>
						<img src={ Loader } className={`search-loading ${ loading ? 'show' : 'hide' }`} alt="loader"/>
						{ this.renderSearchResults() }
					</Grid>
				</Grid>
			</div>
		)
	}
}
export default withStyles(useStyles)(LetterSearch)