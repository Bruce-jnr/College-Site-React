import { createContext, useState, useContext, useCallback } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'alert', // 'alert' or 'confirm'
    onConfirm: null,
    onCancel: null,
  });

  const showAlert = useCallback((title, message) => {
    setModalConfig({
      title,
      message,
      type: 'alert',
      onConfirm: () => setIsOpen(false),
    });
    setIsOpen(true);
  }, []);

  const showConfirm = useCallback((title, message, onConfirm, onCancel) => {
    setModalConfig({
      title,
      message,
      type: 'confirm',
      onConfirm: () => {
        if (onConfirm) onConfirm();
        setIsOpen(false);
      },
      onCancel: () => {
        if (onCancel) onCancel();
        setIsOpen(false);
      },
    });
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ModalContext.Provider value={{ showAlert, showConfirm, closeModal }}>
      {children}
      {isOpen && <CustomModal {...modalConfig} close={closeModal} />}
    </ModalContext.Provider>
  );
};

// Internal component for the actual modal UI
const CustomModal = ({ title, message, type, onConfirm, onCancel, close }) => {
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-card animate-in">
        <div className="custom-modal-header">
          <h4>{title}</h4>
          <button className="close-x" onClick={close}>&times;</button>
        </div>
        <div className="custom-modal-body">
          <p>{message}</p>
        </div>
        <div className="custom-modal-footer">
          {type === 'confirm' && (
            <button className="btn-modal-secondary" onClick={onCancel}>Cancel</button>
          )}
          <button className="btn-modal-primary" onClick={onConfirm}>
            {type === 'confirm' ? 'Confirm' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};
