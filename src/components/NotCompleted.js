import { useSelector } from "react-redux"
import Work from "./Work"
import '../styles/NotCompleted.css'

function NotCompleted() {
    const workNotCompleted = useSelector(state => state.works.workNotCompleted)

    return(
        <div className="box-notCompleted">
            {workNotCompleted.map((task) => (
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

export default NotCompleted