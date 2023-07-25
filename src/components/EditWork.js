import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../firebase"
import Modal from "./Modal"
import '../styles/EditWork.css'
function EditWork({ open, onClose, toEditTitle, toEditDescription, id }) {

    const [title, setTitle] = useState(toEditTitle)
    const [description, setDescription] = useState(toEditDescription)

    const handleUpdate = async (e) => {
        e.preventDefault()
        const taskDocRef = doc(db, 'works', id)
        try {
            await updateDoc(taskDocRef, {
                title: title,
                description: description
            })
            onClose()
        } catch (err) {
            alert(err)
        }
    }

    return (
        <Modal modalLable='Edit Work' onClose={onClose} open={open}>
            <form onSubmit={handleUpdate} className='editWork'>
                <input 
                    type='text' 
                    name='title' 
                    onChange={(e) => setTitle(e.target.value.toUpperCase())} 
                    value={title} />
                <textarea 
                    onChange={(e) => setDescription(e.target.value)} 
                    value={description}>
                </textarea>
                <button type='submit'>Edit</button>
            </form>
        </Modal>
    )
}

export default EditWork