import { db } from "../firebase";
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useSelector } from 'react-redux';
import Modal from "./Modal";
import { useFormik } from 'formik'
import * as Yup from 'yup'

function AddWork({onClose, open}) {
    const user = useSelector(state => state.works.userData);

    const submit = async (values) => {
        const taskDocRef = collection(db, 'works')
        try {
            await addDoc(taskDocRef, values)
            onClose()
        } catch (err) {
            alert(err)
        }
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            completed: false,
            created: Timestamp.now(),
            userId: user.userId
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
        <Modal modalLable='Add Work' onClose={onClose} open={open}>
            <form onSubmit={formik.handleSubmit} className='flex flex-col justify-between items-start'>
                <input
                    className="mt-5 w-full px-3 py-2 border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-purpleee focus:ring-1 focus:ring-purpleee"
                    id='title'
                    type='text'
                    name='title'
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    placeholder='Enter title' 
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
                <div className="flex justify-center mt-2 rounded-md bg-purpleee opacity-70 hover:opacity-100 duration-300 text-white px-5 py-3 w-full">
                    <button className="w-full" type='submit'>Done</button>
                </div>
            </form>
        </Modal>
    )
}

export default AddWork