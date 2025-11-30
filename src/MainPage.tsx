export const MainPage = () => {
    const tasks = [
        // {id: 1, title: 'Task-1', isDone: true},
        // {id: 2, title: 'Task-2', isDone: false},
        // {id: 3, title: 'Task-3', isDone: false},
    ]

    if (tasks.length === 0) {
        return <div><h3>Tasks</h3><span>Loading...</span></div>;
    }

    return (
        <div>
            <h3>Main page</h3>
            <button onClick={() => {}}>reset selection</button>
            <ul style={{display: 'flex', gap: '30px'}}>
                <ol>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <div>
                                <div>
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