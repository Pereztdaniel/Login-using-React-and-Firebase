import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';
import banner from '../images/3937532.png'

const Login = () => {

  	const [{user}, dispatch] = useStateValue();
	const signin = ()=> {
		signInWithPopup(auth, provider)
		  .then(result => dispatch({
		  	type: actionTypes.SET_USER,
		  	user: result.user
		  })).catch((err) => alert(err.message));
	}

	return (
		<div className="login">
			<div className="login__left">
				<h2>Welcome to My Chat App</h2>
				<p>This project was build using React with Redux and connected with Firebase Database</p>
				<Button variant="contained" onClick={signin}>
					Sign In with Google
				</Button>
			</div>
			<div className="login__right">
				<img src={banner} alt="iconscout" />
			</div>
		</div>
	)
}

export default Login