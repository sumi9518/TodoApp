import React from 'react';

const Listitem = (props) => {
   return <li key = {props.item.id} className="list-group-item">

        <button
            className= "btn-sm mr-4 btn btn-info float-left"
            onClick = {props.editTodo}
        >
            Edit
        </button>

       {props.item.name}
        <button
            className= "btn-sm ml-5 btn btn-danger float-right"
            onClick = {props.deleteTodo}
        >
            X
        </button>
    </li>;
}
export default Listitem;