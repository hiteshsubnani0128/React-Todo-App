import React, {Component} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from "@material-ui/core/CardContent";

let myCheck = (check) =>{
  if(check) return {textDecoration: 'line-through'}
  return {textDecoration: 'none'}
}

const Todo = (props) => (
  <div>
    <Card style={{width: "60%"}}>
        <CardContent>
    <li>
      <Checkbox
       onChange={props.onToggle} 
       checked={props.todo.checked}
       indeterminate
       id={props.todo.id}
       />

      <label for={props.todo.id} style={myCheck(props.todo.checked)}>{props.todo.text}</label>
      <button onClick={props.onDelete}>Delete</button>
    </li>
    </CardContent>
      </Card>
  </div>
)

let id=0;
// let newDate = new Date();
class App extends Component{
  
  constructor(props){
    super(props);
    this.state ={
      todos :[],
      value:''
    }
  }

  handleChange = (event)=>{ 
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    if(this.state.value){
    this.setState({ todos : [...this.state.todos, {text: this.state.value, id:id++, checked:false}],value : '' });
    event.preventDefault();
    } else{
      event.preventDefault();
    }
  }

  addTodo = (event)=>{
    // const text = prompt("Enter your Todo");
    this.setState({ todos : [...this.state.todos, {text: event.target.value, id:id++, checked:false}]})
  }

  deleteTodo(id){
    this.setState({todos: this.state.todos.filter(todo => todo.id !== id) })
  }
  
  removeChecked = ()=> {
    this.setState({todos: this.state.todos.filter(todo => !todo.checked) })
  }

  onToggle(id){
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id!==id) return todo
      return{
        id : todo.id,
        text: todo.text,
        checked : !todo.checked
      }
    }) })
  }

  render(){
    return(
      <div>
        <h2>Total Todos :- {this.state.todos.length}</h2>
        <h2>Remaning Todos :- { this.state.todos.filter(todo => !todo.checked).length } </h2>
        <Button onClick={this.removeChecked} variant="contained" color="primary">
        Remove All checked
        </Button>
        <form onSubmit={this.handleSubmit}>
            <TextField id="standard-basic" label="Enter your Todo" type="text" value={this.state.value} onChange={this.handleChange} />
          <Button type="submit" variant="contained" color="primary">
          Submit
          </Button>
        </form>

        <ul className='appCenter'>
          {this.state.todos.map(todo => <Todo 
          todo={todo}
          onDelete = {() => this.deleteTodo(todo.id)}
          onToggle = {() => this.onToggle(todo.id)}
          />)}
        </ul>
      </div>
    )
  }
}

export default App;