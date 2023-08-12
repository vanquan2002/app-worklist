import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../firebase"
import WorkItem from './WorkItem'
import EditWork from './EditWork'

function Work({ id, completed, title, description, index }) {
    const [open, setOpen] = useState({ edit: false, view: false })
    
    const handleClose = () => {
        setOpen({ edit: false, view: false })
    }

    const handleChange = async () => {
        const workDocRef = doc(db, 'works', id)
        try {
            await updateDoc(workDocRef, {
                completed: !completed
            })
        } catch (err) {
            alert(err)
        }
    }

    const handleDelete = async () => {
        const workDocRef = doc(db, 'works', id)
        try {
            await deleteDoc(workDocRef)
        } catch (err) {
            alert(err)
        }
    }
    
    return (
        <div className={`flex flex-row items-center my-5 py-4 bg-white rounded-md ${completed && 'bg-green-100'}`}>
            <h1 className="basis-1/6 flex justify-center">{index + 1} .</h1>
            <div className="basis-1/6 flex justify-center">
                <input
                    className='appearance-none bg-gray-200 checked:bg-green-500 cursor-pointer w-6 h-6' 
                    name="checkbox"
                    checked={completed}
                    onChange={() => {
                        handleChange();
                    }}
                    type="checkbox" 
                />
            </div>
            <div className="basis-2/6 flex justify-center">
                <h2>{title}</h2>
            </div>
            
            <div className='basis-2/6 flex flex-row justify-center items-center gap-x-4'>
                <button
                    className=''
                    onClick={() => setOpen({ ...open, edit: true })}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="vq-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
                <button className='' onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="vq-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
                <button
                    onClick={() => setOpen({ ...open, view: true })}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="vq-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>
            

            {open.view &&
                <WorkItem
                    onClose={handleClose}
                    title={title}
                    description={description}
                    open={open.view} 
                />
            }

            {open.edit &&
                <EditWork
                    onClose={handleClose}
                    toEditTitle={title}
                    toEditDescription={description}
                    open={open.edit}
                    id={id} 
                />
            }
        </div>
    )
}

export default Work