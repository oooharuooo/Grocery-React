import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ list,deleteHandler,editHandler }) => {
  return (
		<div className="grocery-list">
			<div className="grocery-container">
			  {list.map(({ title,id }) => {
					return (
						<article className="grocery-item" key={id}>
							<p className="title">{title}</p>
							<div className="btn-container">
								<button type="button" onClick={()=>editHandler(id)} className="edit-btn">
									<FaEdit />
								</button>
								<button type="button" className="delete-btn" onClick={()=>deleteHandler(id)}>
									<FaTrash />
								</button>
							</div>
						</article>
					);
				})}
			</div>
		</div>
	);
}

export default List
