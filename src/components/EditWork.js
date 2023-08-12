import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import Modal from "./Modal"
import { useFormik } from 'formik'
import * as Yup from 'yup'

function EditWork({ open, onClose, toEditTitle, toEditDescription, id }) {

    const submit = async (value) => {
        const taskDocRef = doc(db, 'works', id)
        try {
            await updateDoc(taskDocRef, value)
            onClose()
        } catch (err) {
            alert(err)
        }
    }

    const formik = useFormik({
        initialValues: {
            title: toEditTitle,
            description: toEditDescription,
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Required')
                .min(4, 'Must be 4 characters or more'),
            description: Yup.string()
                .required('Required')
        }),
        onSubmit: (values)=>{
            submit(values)
            onClose()
        }
    })

    return (
        <Modal modalLable='Edit Work' onClose={onClose} open={open}>
            <form onSubmit={formik.handleSubmit} className=''>
                <input 
                    className="mt-5 w-full px-3 py-2 border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-purpleee focus:ring-1 focus:ring-purpleee"
                    id='title'
                    type='text' 
                    name='title' 
                    onChange={formik.handleChange} 
                    value={formik.values.title} 
                />
                {formik.errors.title && <p className="text-red-600">{formik.errors.title}</p>}
                <textarea 
                    className="mt-3 w-full px-3 py-2 border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-purpleee focus:ring-1 focus:ring-purpleee"
                    id='description'
                    type='text' 
                    name='description'
                    placeholder='Enter work description'
                    onChange={formik.handleChange} 
                    value={formik.values.description}>
                </textarea>
                {formik.errors.description && <p className="text-red-600">{formik.errors.description}</p>}
                <div className="flex justify-center mt-2 rounded-md bg-purpleee opacity-70 hover:opacity-100 duration-300 text-white w-full px-5 py-3">
                    <button className="w-full" type='submit'>Done</button>
                </div>
            </form>
        </Modal>
    )
}

export default EditWork