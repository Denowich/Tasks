import {useEffect, useState} from "react";

export function MainPage () {
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
            headers: {
                'api-key': '48ba2111-574e-4c4e-8c56-a5788c92743b'
            }
        }).then(res => res.json()).then(json => setTasks(json.data));
    }, []);


    if (tasks === null) {
        return (
            <div>
                <h3>Tasks</h3>
                <span>No tasks</span>
            </div>
        )
    }
    if (tasks.length === 0) {
        return (
            <div>
                <h3>Tasks</h3>
                <span>Loading...</span>
            </div>
        )
    }

    return (
        <div>
            <h3>Список задач: </h3>
            <button onClick={() => {
                setSelectedTaskId(null);
                setSelectedTask(null)
            }}>Reset selection
            </button>
            {/**/}
            <ul style={{display: 'flex', gap: '30px'}}>
                <ol>
                    {tasks.map((task) => (
                        <li className='list-item' key={task.id}
                            style={{border: task.id === selectedTaskId ? '5px solid tomato' : '2px solid green'}}>
                            <div>
                                <div onClick={() => {
                                    setSelectedTaskId(task.id)
                                    setSelectedTask(task)
                                }}>
                                    <p>
                                        <b>Заголовок: {task.attributes.title}</b>
                                    </p>
                                </div>

                                <div>
                                    <p>
                                        <b>Статус: <input type={'checkbox'} checked={task.attributes.status}/></b>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <b>Дата создания
                                            задачи: {new Date(task.attributes.addedAt).toLocaleDateString()}</b>
                                    </p>
                                </div>

                            </div>

                        </li>

                    ))}
                </ol>
                <div>
                    <h2>Detail :</h2>
                    {!selectedTask && !selectedTaskId && 'task is not selected'}
                    {selectedTask && !selectedTaskId && 'loading...'}
                    {selectedTask && selectedTaskId && selectedTask.id !== selectedTaskId && 'loading...'}

                    {selectedTask && <div>
                        {selectedTask.attributes.title}
                        <div>
                            <h4>Description :</h4>
                            {selectedTask.attributes.description ?? 'no description'}
                        </div>
                    </div>}
                </div>
            </ul>
        </div>
    )
}