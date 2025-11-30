import {useState} from "react";

// const tasks = [
//     // {id: 1, title: 'Task-1', isDone: true},
//     // {id: 2, title: 'Task-2', isDone: false},
//     // {id: 3, title: 'Task-3', isDone: false},
// ]


export const MainPage = () => {
    const [selectTask, setSelectTask] = useState(null);
    const [tasks, setTasks] = useState(null);



    if (tasks.length === 0) {
        return <div><h3>Tasks</h3><span>Loading...</span></div>;
    }
    if (tasks === null) {
        return <div><h3>Tasks</h3><span>No tasks</span></div>;
    }


    const onResetSelectionClick = () => {
          setSelectTask(null);
    }

    return (
        <div>
            <h3>Tasks</h3>
            <button onClick={onResetSelectionClick}>reset selection</button>
            <ul style={{display: 'flex', gap: '30px'}}>
                <ol>
                    {tasks.map((task: any) => (
                        <li key={task.id} >
                            <div style={{border: task.id === selectTask ? '5px solid tomato' : '2px solid green'}}>
                                <div onClick={()=>{
                                    setSelectTask(task.id);
                                    // setTasks(task)
                                }}>
                                    {task.title}
                                </div>

                                <div><input type={'checkbox'} checked={task.isDone}/>
                                </div>

                            </div>

                        </li>

                    ))}
                </ol>
                <div>
                    <h3>Detail :</h3>

                </div>
            </ul>
        </div>
    )
}