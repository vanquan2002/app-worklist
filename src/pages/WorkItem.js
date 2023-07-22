import Modal from "./Modal"
import '../styles/WorkItem.css'

function TaskItem({ onClose, open, title, description }) {

    return (
        <Modal modalLable='Work Item' onClose={onClose} open={open}>
            <div className='workItem'>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </Modal>
    )
}

export default TaskItem