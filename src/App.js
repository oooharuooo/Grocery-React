import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [input, setInput] = useState("");
  const [list,setList] =useState([]);
  

  const submitHandler = (e) => {
    e.preventDefault()
    const newList = { title: input };
    setList([...list, newList]);
    setInput("");
    console.log(list)
  }
  return (
		<section className="section-center">
			<form className="grocery-form" onSubmit={submitHandler}>
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
						Submit
					</button>
				</div>
			</form>
			<div className="grocery-container">
				<List />
				<button className="clear-btn">Clear</button>
			</div>
		</section>
	);
}

export default App
