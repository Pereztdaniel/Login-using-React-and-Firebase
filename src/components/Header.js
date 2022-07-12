import React from 'react';
import './Header.css';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, IconButton, Button, Switch } from '@material-ui/core';
import logo from '../images/logo.png';
import { useStateValue } from "../StateProvider";
import { actionTypes } from '../reducer';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import  Brightness4Icon from '@material-ui/icons/Brightness4';

const Header = () => {

	const [{isopen, user, darkMode}, dispatch] = useStateValue();


	const toggleMenu = () => {
		dispatch({
			type: actionTypes.TOGGLE_MENU,
			isopen: !isopen,
		})
	}

	const signout = () => {
      signOut(auth).then((user)=>dispatch({
      	type: actionTypes.SET_USER,
      	user: null,
      }));
    }

	return (
	<div className="header">
		<div className="header__left">
			<IconButton onClick={toggleMenu}>
				<MenuIcon fontSize="large" />
			</IconButton>
			<img src={logo} alt="logo" />
		</div>

		<div className="header__right">
			<Avatar className="header__avatar" src={user?.photoURL}/>
			<div className="header__icon">
				<Switch checked={darkMode} onChange={()=> {
					dispatch({
						type: actionTypes.SET_DARKMODE,
						darkMode: !darkMode,
					})
				}}/>
				<Brightness4Icon />
			</div>
			{
				user && <Button onClick={signout} variant='contained'>Sign Out</Button>
			}
		</div>
	</div>
);
}

export default Header