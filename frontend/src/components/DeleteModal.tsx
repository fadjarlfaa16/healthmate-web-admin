import React from "react";

interface DeleteModalProps {
  name: string;
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  name,
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded shadow-lg p-6 z-10">
        <p className="mb-4 text-gray-800">
          Are you sure you want to delete this account named "{name}"?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-center bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
            disabled={isLoading}
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-center bg-blue-500 hover:bg-blue-600 text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
