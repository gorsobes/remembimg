import './Modal.css';

const Modal = ({ isVisible = false, title, content, footer, onClose }) => {
   
    return !isVisible ? null : (
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-dialog">
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
          </div>
          <div className="modal-body">
            <div className="modal-content">{content}</div>
          </div>
          <div className="modal-footer" onClick={onClose}>{footer}</div>
          
        </div>
      </div>
    );
  };
  export default Modal;