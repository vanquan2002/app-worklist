import { useEffect, useState } from 'react'
import Work from './Work'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import AddWork from "./AddWork";
import { useDispatch, useSelector } from 'react-redux';
import { setWork } from '../reducers/workSlice';
import Footer from './Footer';

function WorkManager() {
    const [openAddModal, setOpenAddModal] = useState(false)

    const dispatch = useDispatch()

    const work = useSelector(state => state.works.workData);
    const user = useSelector(state => state.works.userData);
    
    useEffect(() => {
        const taskColRef = query(collection(db, 'works'), orderBy('created', 'desc'))
            onSnapshot(taskColRef, (snapshot) => {
                const workData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))

            const userWorkData = workData.filter(work => work.data.userId === user.userId);

            if (userWorkData) {
                const datas = userWorkData.map(item => ({
                    id: item.id,
                    data: {
                        completed: item.data.completed,
                        title: item.data.title,
                        description: item.data.description,
                        userId: item.data.userId
                    }
                }))
                dispatch(setWork(datas));
            } else {
                dispatch(setWork([]));
            }
        })
    }, [])

    return (
        <div className='mb-8'>
            <div className='flex flex-col justify-start items-center mx-8 rounded-xl 
                            bg-gradient-to-r from-purple-500 to-pink-500 pb-6 min-h-[500px]'>
                <button
                    className='mt-8 mb-3 px-5 py-1 font-medium text-gray-500 hover:text-gray-900 duration-300 
                            drop-shadow-2xl rounded-2xl hover:rounded-lg bg-white'
                    onClick={() => setOpenAddModal(true)}>
                    Add work +
                </button>
                <div className='w-full px-10 lg:px-28'>
                    {work.map((work, index) => (
                        <Work
                            index={index}
                            id={work.id}
                            key={work.id}
                            completed={work.data.completed}
                            title={work.data.title}
                            description={work.data.description}
                        />
                    ))}
                </div>
            </div>

            {openAddModal &&
                <AddWork onClose={() => setOpenAddModal(false)} open={openAddModal} />
            }

            <Footer />
        </div>
    )
}

export default WorkManager