import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useRef, useState, useEffect} from 'react';
import { setSearch } from '../reducers/workSlice';

function Header() {
    const user = useSelector(state => state.works.userData);
    const navigate = useNavigate();

    const handleSignOut = () => {
        auth.signOut()
        navigate('/')
    }

    const [hover, setHover] = useState(false);

    const work = useSelector(state => state.works.workData);
    const dispatch = useDispatch()
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
    const handleSearch = (workItem)=>{
        dispatch(setSearch(workItem))
        inputRef.current.focus()
        setSearchItem('')
        setFoundWork([])
        navigate('/')
    }

    const [showSearch, setShowSearch] = useState(false);
    const btnSearch = ()=>{
        if (showSearch) {
            setFoundWork([])
            setSearchItem('')
            setShowSearch(false)
        }else{
            setShowSearch(true)
        }
    }

    return (
        <>
            <nav className='max-w-screen-2x h-20 mb-10 flex flex-grow justify-between items-center'>
                <div className='text-2xl text-gray-500 flex justify-start items-center gap-6 uppercase  pl-10'>
                    <Link className='vq-top-menu-item' to='/'>Home</Link> 
                    <Link className='vq-top-menu-item' to='/completed'>Completed</Link>
                    <Link className='vq-top-menu-item' to='/notcompleted'>Not Completed</Link>
                </div>

                <div className='mr-6 flex justify-between items-center'>
                    {showSearch && <input
                        ref={inputRef}
                        type="search"
                        value={searchItem}
                        onChange={filter}
                        placeholder="Search..."
                        className='bg-white relative border inline-block border-slate-300 focus:outline-none focus:border-purpleee px-3 py-2 rounded-md drop-shadow-md'
                    /> }
                    {showSearch && <ul className="absolute top-16">
                        {foundWork && foundWork.length > 0 && (
                            foundWork.map((work) => (
                                <li key={work.id} className="cursor-pointer">
                                    <span onClick={()=> handleSearch(work)} className="user-id">{work.data.title}</span>
                                </li>
                            ))
                        )}
                    </ul>}
                    <button 
                        onClick={btnSearch}
                        className='mr-6 ml-3'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="vq-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        
                    </button>
                    

                    <img src={user.photoURL} className='cursor-pointer rounded-full w-12 h-12 mt-1 mr-2' alt="" 
                                onClick={()=>{setHover(!hover)}}
                    />
                    { hover && 
                        <div className='absolute top-20 right-10 p-5 flex flex-col justify-end items-start rounded-xl bg-white drop-shadow-2xl'>
                            <h1 className='font-medium text-gray-600'>{user.displayName}</h1>
                            <button onClick={() => navigate('/user')} className='py-1 flex items-center text-gray-600 hover:text-purpleee'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="vq-icon mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Information
                            </button>
                            <button className='flex items-center text-gray-600 hover:text-purpleee' onClick={handleSignOut}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="vq-icon mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                Sign out
                            </button>
                        </div>}
                </div>
            </nav>          
            
        </>
    )
}

export default Header;
