import { useSelector } from "react-redux"
import Work from "./Work"


function Completed() {
    const workCompleted = useSelector(state => state.works.workCompleted)

    return(
        <>
            {workCompleted.map((task) => (
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

export default Completed