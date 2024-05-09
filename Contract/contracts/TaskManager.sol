pragma solidity ^0.5.0;

contract TaskManager {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
        bool exists; // This flag will help to manage the existence of tasks
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    event TaskCompleted(
        uint id,
        bool completed
    );

    event TaskDeleted(
        uint id
    );

    event TasksCleared();

    constructor() public {
        createTask("This is a demo task.");
    }

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false, true);
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleCompleted(uint _id) public {
        require(tasks[_id].exists, "Task must exist.");
        Task storage _task = tasks[_id];
        _task.completed = !_task.completed;
        emit TaskCompleted(_id, _task.completed);
    }

    function deleteTask(uint _id) public {
        require(tasks[_id].exists, "Task must exist.");
        delete tasks[_id]; // Deletes the task
        emit TaskDeleted(_id);
    }

       function clearTasks() public {
        for (uint i = 1; i <= taskCount; i++) {
            if (tasks[i].exists) {
                delete tasks[i];
            }
        }
        taskCount = 0; // Optionally reset the task count
        emit TasksCleared();
    }
}