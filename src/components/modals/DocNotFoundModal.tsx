import "./DocNotFoundModal.css"
import Portal from "./Portal";
import ExclCircle from '../../assets/exclamation-mark-circle.svg?react';

const DocNotFoundModal = () => {
    return (
        <Portal>
            <div className="nf-container">
                <span><ExclCircle/>링크가 유효하지 않아 이동하지 못했습니다.</span>
            </div>
        </Portal>
    )
}

export default DocNotFoundModal;