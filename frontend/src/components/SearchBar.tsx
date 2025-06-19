import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative flex-1 max-w-lg">
      <input
        type="text"
        placeholder="Search by name, age, specialist, or based..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 text-center focus:ring-blue-500 text-black"
      />
    </div>
  );
};

export default SearchBar;
