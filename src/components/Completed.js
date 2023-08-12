import { useSelector } from "react-redux"
import Work from "./Work"
import NotData from './NotData'
import Footer from './Footer'

function Completed() {
    const workCompleted = useSelector(state => state.works.workCompleted)

    return(
        <div className="mb-8">
            <div className="flex flex-col justify-start items-center mx-8 rounded-xl 
                    bg-gradient-to-r from-purple-500 to-pink-500 pb-6 min-h-[500px]">
                <div className="w-full px-10 lg:px-28 pt-8">
                    {workCompleted.length > 0 ? (
                        workCompleted.map((task, index) => (
                            <Work
                                index={index}
                                id={task.id}
                                key={task.id}
                                completed={task.data.completed}
                                title={task.data.title}
                                description={task.data.description}
                            />
                        ))
                    ) : (
                        <NotData icon='not' text="You haven't completed any work yet"/>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Completed