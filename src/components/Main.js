import React, { useState, useEffect } from 'react';
import './Main.css';
import Post from './Post.js';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import { collection, addDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import FlipMove from 'react-flip-move';
import { useStateValue } from "../StateProvider";


const Main = () => {
	const [posts, setPosts] = useState([])
	const [input, setInput] = useState({
		title: "",
		text: "",
	});

	const [{user}, dispatch] = useStateValue();


	useEffect(() => {
		const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
		const unsub = onSnapshot(q, (snapshot) => setPosts(snapshot.docs.map(doc=>({
				id: doc.id,
				data: doc.data(),
		}))))
	}, [])

	const handleSubmit = async (e)=> {
		e.preventDefault();
		if(input.text){
			try {
			  const docRef = await addDoc(collection(db, "posts"), {
			    text: input.text,
			  	title: input.title,
			  	username: user?.displayName,
			  	avatar: user?.photoURL,
			  	timestamp : firebase.firestore.FieldValue.serverTimestamp(),
			  	isBlue: false,
			  });
			  
			} catch (e) {
			  console.error("Error adding document: ", e);
			}
			
			setInput({
				title: "",
				text: ""
			})
		} else{
			alert("Add Your Post");
		}
		
	}
	return (
	<div className="main">
		<div className="main_input">
			<form noValidate autoComplete="off">
				<div className="main__inputForm">
					<TextField
						id="standard-basic"
						label="Title"
						value={input.title}
						onChange={(e) =>
							setInput({ ...input, title: e.target.value })
						}
					/>
					<TextField
						className="main__inputFormText"
						id="outlined-basic"
						label="Enter your post here ..."
						value={input.text}
						onChange={(e) =>
							setInput({ ...input, text: e.target.value })
						}
					/>
				</div>

				<Button type="submit" onClick={handleSubmit}></Button>
			</form>
		</div>

		<div className="main__posts">
			<FlipMove>
			{
				posts.map(({id, data: {title, text, isBlue, username, avatar}}) => <Post key={id} id={id} title={title} text={text} isBlue={isBlue} username={username} avatar={avatar} />)
			}
			</FlipMove>
		</div>
	</div>
);
}

export default Main