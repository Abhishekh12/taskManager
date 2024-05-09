import React, { Component } from 'react';

class TaskList extends Component {
    state = {
        newTask: ''
    };

    handleInputChange = (event) => {
        this.setState({ newTask: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createTask(this.state.newTask);
        this.setState({ newTask: '' }); // Reset input field after submit
    }

    render() {
const { tasks, toggleCompleted, deleteTask, clearTasks } = this.props;
return (
<div className="container">
<h1>BlockTasker</h1>
<h2>Revolutionize Task Management with Blockchain</h2>
<p>Experience unparalleled security and efficiency in task management with BlockTasker, powered by the robust Ethereum blockchain technology. Streamline your workflows and safeguard your data with the cutting-edge solutions offered by decentralized applications.</p>

<form className="input-group" onSubmit={this.handleSubmit}>
<input
type="text"
value={this.state.newTask}
onChange={this.handleInputChange}
placeholder="Add a new task..."
className="form-control" />
<button type="submit" className="btn btn-primary">Add</button>
<button type="button" className="btn btn-danger" onClick={clearTasks} style={{ marginLeft: '10px' }}>Clear All</button>
</form>
<ul className="task-list">
{tasks.map((task, key) => (
<li key={key} className="task-item">
<label>
<input
type="checkbox"
checked={task.completed}
onChange={() => toggleCompleted(task.id)} />
{task.content}
</label>
<button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
</li>
))}
</ul>
</div>
);
}
}

export default TaskList;
