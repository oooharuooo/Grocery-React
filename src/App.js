import React, { useState, useEffect } from 'react';
import uuid from "react-uuid";
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => { 
	let list = localStorage.getItem('list');
	if (list) {
		return	 JSON.parse(localStorage.getItem('list'))
	} else {
		return []
	 }
}

function App() {
  	const [input, setInput] = useState("");
	const [list, setList] = useState(getLocalStorage);
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [displayMess, setDisplayMess] = useState({
		msg: "",
		show: false,
		type: ""
	})
  

  const submitHandler = (e) => {
	  e.preventDefault()
	//   Prevent user input empty value
	  if (!input) {
		  alertMessage(true, "Please input value", "danger")
	  } else if(isEditing && input){
		  setList(list.map(item => {
			  if(item.id === editId) return {...item,title:input}
			 return item
		 }))
		  setIsEditing(false);
		  alertMessage(true, "Item Edited", "success");
	   }
	  else {
			//   Create list by user input and render
			const newList = { id: uuid(), title: input };
		  	setList([...list, newList]);
			setInput("");
			alertMessage(true, "Item added to the List", "success");
		}
  }
	
	
	// Display message depend on which button is clicked
	const alertMessage = (show=false,msg="",type="") => { 
		setDisplayMess({show, msg, type})
	}

	const clearHandler = () => {
		alertMessage(true, "All items removed", "danger");
		setList([]);
	}
	const deleteHandler = (id) => {
		alertMessage(true, "Item removed", "danger");
		setList(list.filter(item => item.id !== id));
	};
	
	const editHandler = (id) => {
		const uniqueItem = list.find(item => item.id === id);
		setIsEditing(true);
		setEditId(id)
		setInput(uniqueItem.title)
	}

	useEffect(() => {
		localStorage.setItem("list",JSON.stringify(list))
	},[list])
  return (
		<section className="section-center">
			<form className="grocery-form" onSubmit={submitHandler}>
				<Alert {...displayMess} alertMessage={alertMessage} />
				<h3>grocery bud</h3>
				<div className="form-control">
					<input
						type="text"
						className="grocery"
						placeholder="eggs"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button type="submit" className="submit-btn" onClick={submitHandler}>
					  {isEditing ? "Edit" : "Submit"}
					</button>
				</div>
			</form>
			<div className="grocery-container">
				<List
					list={list}
					deleteHandler={deleteHandler}
					editHandler={editHandler}
				/>
				<button className="clear-btn" onClick={clearHandler}>Clear</button>
			</div>
		</section>
	);
}

export default App
