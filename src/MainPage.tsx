import {useEffect, useState} from "react";

export const MainPage = () => {
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
            headers: {
                'api-key': ''
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
                    <h3>Detail :</h3>
                </div>
            </ul>
        </div>
    )
}