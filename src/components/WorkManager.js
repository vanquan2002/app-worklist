import { useEffect, useState, useRef } from 'react'
import Work from './Work'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import AddWork from "./AddWork";
import '../styles/WorkManager.css'
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setCompleted, setNotCompleted, setWork } from '../reducers/workSlice';
import { useNavigate } from 'react-router-dom';

function WorkManager() {
    const [openAddModal, setOpenAddModal] = useState({ addModal: false })

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

            const userWorkData = workData.filter(work => work.data.userId === user?.userId);
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

    const inputRef = useRef()
    const [searchItem, setSearchItem] = useState('');
    const [foundWork, setFoundWork] = useState([]);

    const filter = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = work.filter((item) => {
                return item.data.title.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundWork(results);
        } else {
            setFoundWork([]);
        }
        setSearchItem(keyword);
    };

    const navigate = useNavigate();
    const handleSearch = (workItem)=>{
        dispatch(setSearch(workItem))
        inputRef.current.focus()
        setSearchItem('')
        setFoundWork([])
        navigate('/search')
    }

    return (
        <div className='workManager'>
            <input
                ref={inputRef}
                type="search"
                value={searchItem}
                onChange={filter}
                className="input-search"
                placeholder="Search..."
            /> 
            <ul className="work-list">
                {foundWork && foundWork.length > 0 && (
                    foundWork.map((work) => (
                        <li key={work.id} className="work-item">
                            <span onClick={()=> handleSearch(work)} className="user-id">{work.data.title}</span>
                        </li>
                    ))
                )}
            </ul>


            <div className='workManager__container'>
                <button
                    onClick={() => setOpenAddModal({ ...openAddModal, addModal: true })}>
                    Add work +
                </button>
                <div className='workManager__works'>
                    {work.map((work) => (
                        <Work
                            id={work.id}
                            key={work.id}
                            completed={work.data.completed}
                            title={work.data.title}
                            description={work.data.description}
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