import React from 'react';
import ReactDOM from 'react-dom';
import './navbar.css';
import App from './App';
import firebase from 'firebase';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp({
	apiKey: "AIzaSyDKp0SaoMU0BPJjzb_H9QfrpXMPKy_Ab1A",
    authDomain: "premier-league-b9ec4.firebaseapp.com",
    databaseURL: "https://premier-league-b9ec4.firebaseio.com",
    projectId: "premier-league-b9ec4",
    storageBucket: "premier-league-b9ec4.appspot.com",
    messagingSenderId: "363493706652",
    appId: "1:363493706652:web:866bb6e971bfceb4"
});

export default class Navbar extends React.Component{
	constructor(props){
		super(props);
		this.handleAuth = this.handleAuth.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.logo = 'http://www.logospng.com/images/175/premier-league-wefut-175827.png';
		this.state = {
			user: null
		}
	}

	handleAuth(){
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then(result => {
			console.log(`El usuario se ha logeado`);
		})
		.catch(error => console.log(`Error: ${error.code} ${error.message}`));
	}

	componentWillMount(){
		firebase.auth().onAuthStateChanged(user => {
			this.setState({user});
		});
	}

	handleLogout(){
		firebase.auth().signOut()
		.then(result => {
			this.setState({user: null});
		})
	}

	render(){
		let content;
		let action = this.handleAuth;
		let text = 'Login';
		let create;
		if(this.state.user){
			content = <li><img className="circle img-nav" src={this.state.user.photoURL} alt="Logout"/></li>;
			action = this.handleLogout;
			text = 'Logout';
			console.log(this.state.user.displayName);
			if(this.state.user.displayName == 'Carlos Tellez'){
				create = <li><a href="#"><i className="material-icons left">add</i>Create</a></li>;
			}
		}
		return(
			<div className="navbar-fixed">
			  <nav>
			    <div className="nav-wrapper">
			      <a href="#!" className="brand-logo">Premier League</a>
			      <ul className="right hide-on-med-and-down">
			      	{create}
					<li><a href="#"><i className="material-icons left">ondemand_video</i>Matchs</a></li>
					<li><a href="#" onClick={action}><i className="material-icons left">person</i>{text}</a></li>
					{content}
				  </ul>
				</div>
			  </nav>
			</div>
		);
	}
}