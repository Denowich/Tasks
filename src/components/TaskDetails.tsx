import {useEffect, useState} from "react";

// const selectedTaskId = '4f310604-82b5-4afd-b9a4-ddf12dfac0a3';

export function TaskDetails(props) {
    const [selectedTask, setSelectedTask] = useState(null);
    const selectedTaskId = props.taskId
    const boardId = '13923117-72de-4788-a7f0-4c42f162a5ab';

    useEffect(() => {
        if (!selectedTaskId) {
            return;
        }
        fetch('https://trelly.it-incubator.app/api/1.0/boards/' + boardId + '/tasks/' + selectedTaskId, {
            headers: {
                // !!! УДАЛИ API !!!
                'api-key': '275ca08a-3656-4d87-83ad-ac1fe77bd653-'
            }
        }).then(res => res.json()).then(json => setSelectedTask(json.data));
    }, [selectedTaskId]);

    return (
        <div className='details-item'>
            <h3>Task details :</h3>

            {!selectedTask && !selectedTaskId && 'task is not selected'}
            {!selectedTask &&  selectedTaskId && 'loading...1'}

            {selectedTask && selectedTaskId && selectedTask.id !== selectedTaskId && 'loading...'}
            {selectedTask &&
            <div>
                    <p>title - {selectedTask.attributes.title}</p>
                    <p>boardTitle - {selectedTask.attributes.boardTitle ?? 'no board'}</p>
                    <p>description - {selectedTask.attributes.description ?? 'no description'}</p>
                </div>
            }
        </div>
    )
}