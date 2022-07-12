import React, { forwardRef} from 'react';
import './Post.css';
import { useStateValue } from "../StateProvider";
import { Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { db } from '../firebase';
import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';



const Post = forwardRef(({id, title, text, isBlue, username, avatar}, ref) => {

	const [{user}, dispatch] = useStateValue();

	const removePost = async() => {
		await deleteDoc(doc(db, "posts", id))
	}

	const likePost = async() => {
		const linkedPost = doc(db, "posts", id);

		const snapDoc = await getDoc(linkedPost);

		await updateDoc(linkedPost, {
			'isBlue': !snapDoc.data().isBlue
		});
	}

	return (
		<div className="post" ref={ref}>
			<div className="post__body">
				<div className="post__bodyLeft">
					<Avatar className="avatar" src={avatar} />
					<p>{username}</p>
				</div>
				<div className="post__bodyRight">
					<h3>{title}</h3>
					<h4>{text}</h4>
				</div>		
			</div>
			<div className="post__icon">	
				<IconButton onClick={likePost}>
					<ThumbUpAltOutlinedIcon color={isBlue ? 'primary' : '' }/>
				</IconButton>
				<IconButton onClick={removePost}>
					<DeleteIcon/>
				</IconButton>
			</div>
		</div>
	)
})

export default Post