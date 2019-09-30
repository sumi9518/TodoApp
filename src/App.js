import React from 'react';
import './App.css';
import Listitem from './Listitem';
import axios from 'axios'

class App extends React.Component {

  constructor() {
    super();
    this.state = {

      newtodo: '',
      editing: false,
      editingIndex: null,
      notification:null,

      todo : []
    };
  this.apiUrl ='http://5d9076e4b9f5430014c27144.mockapi.io'

  }

  async componentDidMount() {
  const response = await axios.get(`${this.apiUrl}/todo`);
  this.setState({
    todo: response.data
  })
  }

  generateTodoId = () =>{
    const lastId = this.state.todo[this.state.todo.length -1];
    if(lastId) {
      return lastId + 1;
    }
    return 1
  }

  userInput = (event) =>{
   this.setState({
     newtodo: event.target.value
    });

  }

  addTodo =() =>{
    const myvalue ={
      name: this.state.newtodo,
      id: this.generateTodoId()
    };

    const oldtodo = this.state.todo;
    oldtodo.push(myvalue);
    this.setState({
      todo: oldtodo,
      newtodo:''

    });
    this.alert('Todo Added Successfully')
    }


  editTodo = (index) => {
    const edittask = this.state.todo[index];

      this.setState({
        editing: true,
        newtodo : edittask.name,
        editingIndex : index
      })
    }

  updateTodo = (index) => {
    const getstate = this.state.todo[this.state.editingIndex]; //took it out of state
    getstate.name = this.state.newtodo; //updated name
    const oldtodo = this.state.todo;

    this.setState({
      todo : oldtodo,
      editing: false,
      editingIndex:null,
      newtodo:''
    });
    this.alert('Todo Updated Successfully')


  }

  deleteTodo = (index) =>{
      const oldtodo = this.state.todo;
      delete oldtodo[index];

      this.setState({
        todo: oldtodo,
      });
    this.alert('Todo Deleted successfully')

  }

   alert=(notification)=>{
    this.setState({
      notification
    });

    setTimeout(()=>{
      this.setState({
        notification:null
      })
    },2000)

   }


render() {

  return (
    <div className="App">
    <div className="container">
      {this.state.notification &&

      <div className="alert mt-3 alert-success">
        <p>{this.state.notification}</p>
      </div>
      }
      <h2 className="text-center">Todo App</h2>

      <input type="text"
             name="userInput"
             className="my-4 form-control"
             placeholder="Enter your todo"
             onChange={this.userInput}
             value={ this.state.newtodo}
             />

      <button onClick={this.state.editing ? this.updateTodo : this.addTodo}
              className="btn-info mb-3 form-control"
              disabled={this.state.newtodo.length < 2 }
      >
        {this.state.editing ? 'Update Todo' : 'Add Todo'}
      </button>

      {
        !this.state.editing &&
        <ul className="list- group">
          {this.state.todo.map((item, index) => {
            return <Listitem
            key = {item.id}
            item ={item}
            editTodo = {() => {this.editTodo(index);}}
            deleteTodo = { () => {this.deleteTodo(index);}}
            />
          })}
        </ul>
      }


    </div>
    </div>
  );
}
}
export default App;
