function Modal({ open, modalLable, children, onClose }) {

    const handleClose = (e) => {
        if (e.target.id === 'modalContainer') {
            onClose()
        }
        return null
    }

    if (open) {
        return (
            <div id='modalContainer' 
                className='fixed max-w-screen h-screen flex top-0 bottom-0 left-0 right-0 
                        justify-center z-50 items-center bg-black bg-opacity-20' 
                onClick={handleClose}>
                    
                <div className='pt-3 pb-7 px-8 w-[400px] rounded-xl bg-white'>
                    <div className='flex justify-between items-center'>
                        <h2>{modalLable}</h2>
                        <span className='cursor-pointer text-2xl' onClick={onClose}>x</span>
                    </div>
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </div>
        )
    }
    return null
}

export default Modal