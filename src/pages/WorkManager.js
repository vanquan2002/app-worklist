import { useEffect, useState } from 'react'
import Work from './Work'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { auth, db } from '../firebase'
import AddWork from "./AddWork";
import '../styles/WorkManager.css'

function WorkManager({user}) {
    const [openAddModal, setOpenAddModal] = useState({ addModal: false })
    const [works, setWork] = useState([])

    useEffect(() => {
        const taskColRef = query(collection(db, 'works'), orderBy('created', 'desc'))
        onSnapshot(taskColRef, (snapshot) => {
            setWork(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])
    console.log(works);

    return (
        <div className='workManager'>
            <header>Work Manager</header>
            <div className='workManager__user'>
                <img src={user.photoURL} onClick={() => setOpenAddModal({ ...openAddModal, userModal: true })} alt="" />
                <div className='dropdown'>
                    <h1>{user.displayName}</h1>
                    <button className="button signout" onClick={() => auth.signOut()}>Sign out</button>
                </div> 
            </div>
            <div className='workManager__container'>
                <button
                    onClick={() => setOpenAddModal({ ...openAddModal, addModal: true })}>
                    Add work +
                </button>
                <div className='workManager__tasks'>

                    {works.map((task) => (
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