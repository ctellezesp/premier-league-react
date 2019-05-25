import React from 'react';
import ReactDOM from 'react-dom';
import './add.css';
import App from './App';
import firebase from 'firebase';
import * as serviceWorker from './serviceWorker';

/*firebase.initializeApp({
	apiKey: "AIzaSyDKp0SaoMU0BPJjzb_H9QfrpXMPKy_Ab1A",
    authDomain: "premier-league-b9ec4.firebaseapp.com",
    databaseURL: "https://premier-league-b9ec4.firebaseio.com",
    projectId: "premier-league-b9ec4",
    storageBucket: "premier-league-b9ec4.appspot.com",
    messagingSenderId: "363493706652",
    appId: "1:363493706652:web:866bb6e971bfceb4"
});*/

export default class Add extends React.Component{
	constructor(props){
		super(props);
		this.seasons = ['2000-01', '2001-02', '2002-03', '2003-04', '2004-05', '2005-06', '2007-08', '2009-10', '2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19', '2019-20'];
		this.create = this.create.bind(this);
		this.selectSeason = this.selectSeason.bind(this);
		this.title = React.createRef();
		this.matches = React.createRef();
		this.frame = React.createRef();
		this.state = {
			season: null
		}
	}

	selectSeason(event){
		console.log(event.target.value);
		this.setState({season: event.target.value});
	}

	create(){
		console.log(this.state.season);
		let id = Math.random().toString(36).substr(2, 9);
		firebase.database().ref(id).set({
			title: this.title,
			frame: this.frame,
			matches: this.matches
		});
		alert('Se agrego correctamente');
	}

	render(){
		return(
			<div className="row">
				<div className="col s12 l8 offset-l2">
					<div className="row">
						<div className="input-field col s12 l8">
						  Title:
				          <input id="title" type="text" className="validate" ref={this.title}/>
				        </div>
				        <div className="input-field col s12 l4">
				          Season:
				          <select className="browser-default" onChange={this.selectSeason}>
				          	  <option value="" disabled>Choose a season</option>
							  {this.seasons.map(season => {
							  	return <option key={season} value={season}>{season}</option>;
							  })}
						  </select>
				        </div>
				        <div className="input-field col s12">
						  frame:
				          <input id="title" type="text" className="validate" ref={this.frame}/>
				        </div>
				        <div className="input-field col s12">
				          Matches:
				          <textarea id="matches" className="materialize-textarea" ref={this.matches}></textarea>
				        </div>
					</div>
					<a className="waves-effect waves-light btn right" onClick={this.create}><i className="material-icons left">done</i>Post</a>
				</div>
			</div>
		);
	}
}