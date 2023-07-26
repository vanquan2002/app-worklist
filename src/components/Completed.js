import { useSelector } from "react-redux"
import Work from "./Work"
import '../styles/Completed.css'

function Completed() {
    const workCompleted = useSelector(state => state.works.workCompleted)

    return(
        <div className="box-completed">
            {workCompleted.map((task) => (
                <Work
                    id={task.id}
                    key={task.id}
                    completed={task.data.completed}
                    title={task.data.title}
                    description={task.data.description}
                />
            ))}
        </div>
    )
}

export default Completed