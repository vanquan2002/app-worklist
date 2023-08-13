import { useSelector } from "react-redux"
import Work from "./Work"
import NotData from './NotData'
import Footer from './Footer'

function NotCompleted() {
    const workNotCompleted = useSelector(state => state.works.workNotCompleted)

    return(
        <div className="mb-8 mt-24">
            <div className="flex flex-col justify-start items-center mx-8 rounded-xl 
                    bg-gradient-to-r from-purple-500 to-pink-500 pb-6 min-h-[500px]">
                <p className="pt-8 text-white text-xl uppercase font-mono">Not completed work list</p>    
                <div className="w-full px-10 lg:px-28">
                    {workNotCompleted.length > 0 ? (
                        workNotCompleted.map((task, index) => (
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
                        <NotData icon='yes' text='You have finished all the work'/>
                    )}
                </div>
            </div>   
            
            <Footer />
        </div>
    )
}

export default NotCompleted