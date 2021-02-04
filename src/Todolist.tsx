import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList:(todoListID:string)=>void|undefined
    changeStatus: (TaskID: string, isDone: boolean, todoListId: string) => void

}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id);

        } else {
            setError(true)
        }
        setTitle("");

    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3>{props.title}<button onClick={ () => {props.removeTodoList(props.id)} }>X</button></h3>
        <div>
            <input value={title}
                   onChange={changeTitle}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
                   onBlur={() => {
                       setError(false)
                   }}
            />
            <button onClick={addTask}>+</button>
            {error&&<div className="error-message">{error}</div>}

        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)

                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={changeStatus}
                        />
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button
                className={props.filter === "all" ? "active-filter" : ""}
                onClick={onAllClickHandler}>All
            </button>
            <button
                className={props.filter === "active" ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active
            </button>
            <button
                className={props.filter === "completed" ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


