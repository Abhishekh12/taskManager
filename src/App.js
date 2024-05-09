import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { TASK_LIST_ABI, TASK_LIST_ADDRESS } from './config';
import TaskList from './TaskList'; // Capitalized component name

class App extends Component {
state = {
account: '',
taskCount: 0,
tasks: [],
loading: true
    };

    async componentDidMount() {
        await this.loadBlockchainData();
    }

    async loadBlockchainData() {
if (window.ethereum) {
try {
await window.ethereum.request({ method: 'eth_requestAccounts' });
const web3 = new Web3(window.ethereum);
const accounts = await web3.eth.getAccounts();
this.setState({ account: accounts[0] });
const tasklist = new web3.eth.Contract(TASK_LIST_ABI, TASK_LIST_ADDRESS);
this.setState({ tasklist });
await this.refreshTasks();
} catch (error) {
console.error("Failed to load blockchain data:", error);
this.setState({ loading: false });
}
} else {
console.error("Ethereum object doesn't exist!");
}
}

refreshTasks = async () => {
const { tasklist } = this.state;
const taskCount = await tasklist.methods.taskCount().call();
const tasks = [];
for (let i = 1; i <= taskCount; i++) {
const task = await tasklist.methods.tasks(i).call();
if (task.exists) {
tasks.push({ ...task, id: task.id.toString() });
}
}
this.setState({ tasks, loading: false });
    }

createTask = async (content) => {
this.setState({ loading: true });
const { tasklist, account } = this.state;
await tasklist.methods.createTask(content).send({ from: account });
await this.refreshTasks();
 }

    deleteTask = async (id) => {
        this.setState({ loading: true });
        const { tasklist, account } = this.state;
        await tasklist.methods.deleteTask(id).send({ from: account });
        await this.refreshTasks();
}

    toggleCompleted = async (taskId) => {
        this.setState({ loading: true });
        const { tasklist, account } = this.state;
        await tasklist.methods.toggleCompleted(taskId).send({ from: account });
        await this.refreshTasks();
}

clearTasks = async () => {
this.setState({ loading: true });
const { tasklist, account } = this.state;
await tasklist.methods.clearTasks().send({ from: account });
await this.refreshTasks();
}
render() {
const { loading, tasks } = this.state;
return (
<div>
<nav className="navbar">
<span className="navbar-brand">Crypto Blockchain | Task Manager</span>
</nav>
<div className="container-fluid">
<div className="row">
<main role="main" className="col-lg-12 d-flex justify-content-center">
{loading
? <div id="loader" className="text-center"><p>Loading...</p></div>
: <TaskList
tasks={tasks}
createTask={this.createTask}
toggleCompleted={this.toggleCompleted}
deleteTask={this.deleteTask}
clearTasks={this.clearTasks} />
}
</main>
</div>
</div>
</div>
);
    }
}

export default App;
