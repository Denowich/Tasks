import {useEffect, useState} from "react";

export function MainPage () {
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
            headers: {
                // !!! УДАЛИ API !!!
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
                setSelectedTask(null);
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

                                    fetch('https://trelly.it-incubator.app/api/1.0/boards/' + task.boardId + '/tasks/' + task.id, {
                                        headers: {
                                    //         !!! УДАЛИ API !!!
                                            'api-key': '275ca08a-3656-4d87-83ad-ac1fe77bd653'
                                        }
                                    }).then(res => res.json()).then(json => setSelectedTask(json.data));
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
                    <div>
                        <h3>Task details :</h3>
                        {!selectedTask && !selectedTaskId && 'task is not selected'}
                        {!selectedTask && selectedTaskId && 'loading...1'}
                        {selectedTask && selectedTaskId && selectedTask.id !== selectedTaskId && 'loading...2'}

                        {selectedTask &&
                            <div>
                                {selectedTask.attributes.title}
                                <p>Description :</p>
                                {selectedTask.attributes.description ?? 'no description'}
                            </div>
                        }
                    </div>
                </div>
            </ul>
        </div>
    )
}