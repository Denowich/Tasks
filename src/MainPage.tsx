import {useEffect, useState} from "react";

export const MainPage = () => {
    const [selectTaskId, setSelectTaskId] = useState(null);
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        fetch( 'https://trelly.it-incubator.app/api/1.0/boards/tasks',{
            headers: {
                'api-key': '48ba2111-574e-4c4e-8c56-a5788c92743b'
            }
        }).then(res=>res.json()).then(json=>setTasks(json.data));
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


    const onResetSelectionClick = () => {
        setSelectTaskId(null);
    }

    return (
        <div>
            <h3>Tasks</h3>
            <button onClick={onResetSelectionClick}>reset selection</button>
            {/**/}
            <ul style={{display: 'flex', gap: '30px'}}>
                <ol>
                    {tasks.map((task) => (
                        <li key={task.id}
                            style={{border: task.id === selectTaskId ? '5px solid tomato' : '2px solid green'}}>
                            <div>
                                <div onClick={() => {
                                    setSelectTaskId(task.id)
                                }}>
                                    {task.attributes.title}
                                </div>

                                <div><input type={'checkbox'} checked={task.attributes.status}/>
                                </div>
                                <div>
                                    {task.attributes.addedAt}
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