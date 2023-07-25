import { useSelector } from "react-redux"
import Work from "./Work"


function NotCompleted() {
    const workNotCompleted = useSelector(state => state.works.workNotCompleted)

    return(
        <>
            {workNotCompleted.map((task) => (
                <Work
                    id={task.id}
                    key={task.id}
                    completed={task.data.completed}
                    title={task.data.title}
                    description={task.data.description}
                />
            ))}
        </>
    )
}

export default NotCompleted