import { useSelector } from "react-redux"
import Work from "../components/Work"
import NotData from '../components/NotData'
import Footer from '../components/Footer'

function Completed() {
    const workCompleted = useSelector(state => state.works.workCompleted)

    return(
        <div className="mb-8 mt-24">
            <div className="flex flex-col justify-start items-center mx-8 rounded-xl 
                    bg-gradient-to-r from-purple-500 to-pink-500 pb-6 min-h-[500px]">
                <p className="pt-8 text-white text-xl uppercase font-mono">Completed work list</p>    
                <div className="w-full px-10 lg:px-28">
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