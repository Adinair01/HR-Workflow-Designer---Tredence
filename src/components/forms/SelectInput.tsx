interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}

export function SelectInput({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  disabled,
}: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="
        w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200
        bg-white text-gray-800
        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
        disabled:bg-gray-50 disabled:text-gray-400
        transition-all
      "
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
