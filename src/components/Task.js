import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
function Task() {

    const inputDOM = useRef()

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getAll()
    }, []);

    async function getAll() {
        const { data } = await axios.get("http://localhost:5000/tasks")
        setTasks(data.result)
    }


    async function handleSubmit(e) {
        e.preventDefault()
        const taskName = inputDOM.current.value
        await axios.post("http://localhost:5000/task", { name: taskName })
        getAll()
        inputDOM.current.value = ""
    }

    return (
        <>
            <form className="task-form" onSubmit={handleSubmit} >
                <h4>task manager</h4>
                <div className="form-control">
                    <input ref={inputDOM} type="text" name="name" className="task-input" placeholder="e.g. learn nodejs" />
                    <button type="submit" className="btn submit-btn">Add</button>
                </div>
                <div className="form-alert"></div>
            </form>
            <section className="tasks-container">

                <p className="loading-text">Loading...</p>

                <div className="tasks">

                    {
                        tasks.map((el) => {
                            return (
                                <div key={el.id} className={`single-task ${el.completed && "task-completed"}`}>
                                    <h5><span><i className="far fa-check-circle"></i></span>{el.task_name}</h5>
                                    <div className="task-links">

                                        <a href="task.html" className="edit-link">
                                            <i className="fas fa-edit"></i>
                                        </a>

                                        <button type="button" className="delete-btn">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        })

                    }

                </div>
            </section>

        </>
    )
}

export default Task