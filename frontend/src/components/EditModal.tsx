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

  const fields: Array<keyof Doctor> = [
    "fullname",
    "age",
    "specialist",
    "based",
    "contact",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 z-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Edit Doctor
        </h2>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {fields.map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={`edit-${field}`}
                className="text-gray-700 text-sm mb-1"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={`edit-${field}`}
                name={field}
                type={field === "age" ? "number" : "text"}
                value={doctor[field] as any}
                onChange={onChange}
                required
                disabled={isLoading}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          {/* Buttons */}
          <div className="sm:col-span-2 flex justify-end space-x-3 mt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
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
