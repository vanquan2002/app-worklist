import { db } from "../firebase";
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useState } from "react";
import { useSelector } from 'react-redux';
import Modal from "./Modal";
import '../styles/AddWork.css'

function AddWork({onClose, open}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const user = useSelector(state => state.works.userData);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const taskDocRef = collection(db, 'works')
        try {
            await addDoc(taskDocRef, {
                title: title,
                description: description,
                completed: false,
                created: Timestamp.now(),
                userId: user.userId
            })
            onClose()
        } catch (err) {
            alert(err)
        }
    }

    return (
        <Modal modalLable='Add Work' onClose={onClose} open={open}>
            <form onSubmit={handleSubmit} className='addWork' name='addWork'>
                <input
                    type='text'
                    name='title'
                    onChange={(e) => setTitle(e.target.value.toUpperCase())}
                    value={title}
                    placeholder='Enter title' />
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Enter work decription'
                    value={description}></textarea>
                <button type='submit'>Done</button>
            </form>
        </Modal>
    )
}

export default AddWork