
import React from 'react';

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  helpText?: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ label, name, helpText, required, ...props }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        {...props}
        className="block w-full bg-gray-700/50 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
      />
      {helpText && <p className="mt-2 text-xs text-gray-500">{helpText}</p>}
    </div>
  );
};

export default FormTextArea;
