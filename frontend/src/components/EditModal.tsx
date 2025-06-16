import React from "react";

interface Doctor {
  fullname: string;
  age: number;
  based: string;
  contact: string;
  specialist: string;
}

interface EditModalProps {
  doctor: Doctor;
  isOpen: boolean;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  doctor,
  isOpen,
  isLoading,
  onChange,
  onCancel,
  onSubmit,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded shadow-lg p-6 z-10 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Doctor</h2>
        <form onSubmit={onSubmit}>
          {["fullname", "age", "specialist", "based", "contact"].map(
            (field) => (
              <div className="mb-4" key={field}>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-center"
                  htmlFor={`edit-${field}`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "age" ? "number" : "text"}
                  id={`edit-${field}`}
                  name={field}
                  value={(doctor as any)[field] || ""}
                  onChange={onChange}
                  className="w-full px-3 py-2 text-center border border-gray-300 rounded-md text-black"
                  required
                  disabled={isLoading}
                />
              </div>
            )
          )}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-center bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-center bg-blue-500 hover:bg-blue-600 text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
