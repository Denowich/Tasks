import {useEffect, useState} from "react";

export function TasksList(props) {
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        console.log('effect')

        fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
            headers: {
                // !!! УДАЛИ API !!!
                'api-key': '275ca08a-3656-4d87-83ad-ac1fe77bd653'
            }
        }).then(res => res.json()).then(json => setTasks(json.data));
    }, []);

    if (tasks === null) {
        return (
            <div>
                <span>No tasks</span>
            </div>
        )
    }
    if (tasks.length === 0) {
        return (
            <div>
                <span>Loading...</span>
            </div>
        )
    }

    return (
        <div>
            <button onClick={() => {
                props.onSelectedTask(null)}}>reset selection
            </button>

            <ul>
                <ol>
                    {tasks.map((task) => {
                        return (
                            <li className='list-item' key={task.id}
                                style={{border: task.id === props.isSelect ? '5px solid blue' : '5px solid green'}}>
                                <div>
                                    <div onClick={() => {
                                        props.onSelectedTask?.(task.id)
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
                        )
                    })}
                </ol>
            </ul>
        </div>
    )
}