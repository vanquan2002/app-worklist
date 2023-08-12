import Modal from "./Modal"

function TaskItem({ onClose, open, title, description }) {

    return (
        <Modal modalLable='Work Item' onClose={onClose} open={open}>
            <div className='workItem'>
                <h2>Title: {title}</h2>
                <p>Description: {description}</p>
            </div>
        </Modal>
    )
}

export default TaskItem