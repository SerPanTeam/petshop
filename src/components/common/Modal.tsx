import IcoX from "@/assets/icons/x.svg?react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null; 
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} 
    >
      <div
        className="bg-blue-600 rounded-lg p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()} 

      >
        {title && <h2 className="text-xxl font-bold mb-4 text-white">{title}</h2>}
        {children}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-gray-500"
        >
          <IcoX/>
        </button>
      </div>
    </div>
  );
};

export default Modal;
