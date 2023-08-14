import React from 'react'
import { useSelector } from 'react-redux';

export default function User() {
  const user = useSelector(state => state.works.userData);

  return (
    <div className='flex flex-col justify-center items-center mt-48'>
        <div className='flex flex-col justify-center items-center w-64 pt-16 pb-12 rounded-2xl border-2 border-purpleee drop-shadow-2xl'>
          <img src={user.photoURL} className='border-2 border-purpleee rounded-full duration-200 hover:ring-2 hover:ring-purpleee' alt="" />
          <p className='mt-5 text-gray-500 text-lg'>{user.displayName}</p>
          <p className='text-gray-400 font-mono'>{user.email}</p>

          <div className='flex flex-row justify-center items-center mt-8'>
            <p className='pr-2 font-medium text-gray-500'>Một ngày làm việc vui vẻ nhé!</p>
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
            </svg>
        </div>
        </div>
    </div>
  )
}
