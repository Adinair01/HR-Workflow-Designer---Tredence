interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'date' | 'number' | 'email';
}

export function TextInput({
  value,
  onChange,
  placeholder,
  disabled,
  type = 'text',
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="
        w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200
        bg-white text-gray-800 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
        disabled:bg-gray-50 disabled:text-gray-400
        transition-all
      "
    />
  );
}
