import React from 'react'

export default function Error404() {
  return (
    <div className='flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-gray-100'>
      <div className='flex flex-row justify-center items-start'>
        <p className='text-[120px] font-semibold text-purpleee text-red opacity-70 drop-shadow-[0_1px_1px_gray] mr-2'>404</p>
        <svg class="w-[100px] h-[100px] text-purpleee opacity-70 drop-shadow-[0_1px_1px_gray]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M19 11V9a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L12 2.757V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L2.929 4.343a1 1 0 0 0 0 1.414l.536.536L2.757 8H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535L8 17.243V18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H18a1 1 0 0 0 1-1Z"/>
            <path d="M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
          </g>
        </svg>
      </div>
      <p className='text-[50px] font-medium text-gray-400'>Page not found</p>
    </div>
  )
}
