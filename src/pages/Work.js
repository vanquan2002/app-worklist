import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../firebase"
import WorkItem from './WorkItem'
import EditWork from './EditWork'
import '../styles/Work.css'

function Work({ id, completed, title, description }) {
    const [checked, setChecked] = useState(completed)
    const [open, setOpen] = useState({ edit: false, view: false })
    
    const handleClose = () => {
        setOpen({ edit: false, view: false })
    }

    const handleChange = async () => {
        const workDocRef = doc(db, 'works', id)
        try {
            await updateDoc(workDocRef, {
                completed: checked
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
        <div className={`work ${checked && 'work--borderColor'}`}>
            <div>
                <input
                    id={`checkbox-${id}`}
                    className='checkbox-custom'
                    name="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    type="checkbox" 
                />
                <label
                    htmlFor={`checkbox-${id}`}
                    className="checkbox-custom-label"
                    onClick={() => setChecked(!checked)} >
                </label>
            </div>
            <div className='work__body'>
                <h2>{title}</h2>
                <p>{description}</p>
                <div className='work__buttons'>
                    <div className='work__deleteNedit'>
                        <button
                            className='work__editButton'
                            onClick={() => setOpen({ ...open, edit: true })}>
                            Edit
                        </button>
                        <button className='work__deleteButton' onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                        <button
                            onClick={() => setOpen({ ...open, view: true })}>
                            View
                        </button>
                </div>
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