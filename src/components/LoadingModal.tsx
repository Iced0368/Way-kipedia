import Portal from "./Portal";
import "./LoadingModal.css"

const LoadingModal = () => {
    return (
        <Portal>
            <div className="loading-container">
                <div className='loading'></div> 
                <span>Loading...</span>
            </div>
        </Portal>
    )
}

export default LoadingModal;