import { useEffect, useState } from 'react'
import Work from './Work'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import AddWork from "./AddWork";
import '../styles/WorkManager.css'
import { useDispatch, useSelector } from 'react-redux';
import { setCompleted, setNotCompleted } from '../reducers/workSlice';

function WorkManager() {
    const [openAddModal, setOpenAddModal] = useState({ addModal: false })
    const [userWorks, setUserWork] = useState([])

    const dispatch = useDispatch()
    const user = useSelector(state => state.works.userData);

    useEffect(() => {
        const taskColRef = query(collection(db, 'works'), orderBy('created', 'desc'))
        onSnapshot(taskColRef, (snapshot) => {
            const workData = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))

            const userWorkData = workData.filter(work => work.data.userId === user?.userId);
            setUserWork(userWorkData);

            const checkCompleted = userWorkData.filter(work => work.data.completed === true);
            const checkNotCompleted = userWorkData.filter(work => work.data.completed === false);

            const completed = checkCompleted.map(item => ({
                id: item.id,
                data: {
                    completed: item.data.completed,
                    title: item.data.title,
                    description: item.data.description,
                    userId: item.data.userId
                }
            }))

            const notCompleted = checkNotCompleted.map(item => ({
                id: item.id,
                data: {
                    completed: item.data.completed,
                    title: item.data.title,
                    description: item.data.description,
                    userId: item.data.userId
                }
            }))

            dispatch(setCompleted(completed));
            dispatch(setNotCompleted(notCompleted));
        })
    }, [])


    return (
        <div className='workManager'>
            <div className='workManager__container'>
                <button
                    onClick={() => setOpenAddModal({ ...openAddModal, addModal: true })}>
                    Add work +
                </button>
                <div className='workManager__tasks'>

                    {userWorks.map((task) => (
                        <Work
                            id={task.id}
                            key={task.id}
                            completed={task.data.completed}
                            title={task.data.title}
                            description={task.data.description}
                        />
                    ))}

                </div>
            </div>

            {openAddModal.addModal &&
                <AddWork onClose={() => setOpenAddModal(false)} open={openAddModal.addModal} />
            }

        </div>
    )
}

export default WorkManager