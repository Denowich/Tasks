import {PageTitle} from "./components/PageTitle.tsx";
import {TasksList} from "./components/TasksList.tsx";
import {TaskDetails} from "./components/TaskDetails.tsx";
import {useState} from "react";



export function MainPage() {
    const [taskId, setTaskId] = useState(null);

    return (
        <div>
            <PageTitle/>
            <div className="main_page">
                <TasksList isSelect={taskId} onSelectedTask={(id)=>{
                    setTaskId(id);
                }}/>
                <TaskDetails taskId={taskId}/>
            </div>
        </div>
    )
}