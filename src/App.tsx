import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todolists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: 'all'},
        {id: todoListID2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "c", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "cheese", isDone: false},
            {id: v1(), title: "pho", isDone: false},
            {id: v1(), title: "bo", isDone: false},
        ]
    })

    // const [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);

    function removeTask(id: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    //let [filter, setFilter] = useState<FilterValuesType>("all");
    //
    // let tasksForTodolist = tasks;
    //
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todolists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todolists])
        }
    }

    function removeTodoList(todoListID:string){
        setTodoLists(todolists.filter(tl=>tl.id!==todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let taskForTodoList=tasks[tl.id]
                    if(tl.filter==="active"){
                        taskForTodoList=tasks[tl.id].filter(t=>t.isDone===false)
                    }  if(tl.filter==="completed"){
                        taskForTodoList=tasks[tl.id].filter(t=>t.isDone===true)
                    }
                    return (
                        <Todolist title={tl.title}
                                  id={tl.id}
                                  key={tl.id}
                                  tasks={taskForTodoList}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  filter={tl.filter}
                                  addTask={addTask}
                                  changeStatus={changeStatus}
                                  removeTodoList={removeTodoList}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;