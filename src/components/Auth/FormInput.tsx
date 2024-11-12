import React, { ChangeEvent, FocusEvent } from "react";
import { Field, ErrorMessage } from "formik";

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  setFormError: (error: string | null) => void;
  setSuccessMss?: (message: string | null) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  placeholder,
  setFormError,
  setSuccessMss,
  handleChange,
  handleBlur,
  className = "",
}) => (
  <div className={`input-box space-y-2 h-auto sm:h-[84px] ${className}`}>
    <label htmlFor={name} className="block text-msm font-medium text-gray-900">
      {label}
    </label>
    <div>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFormError(null);
          if (setSuccessMss) setSuccessMss(null);
          handleChange(e);
        }}
        onBlur={handleBlur}
        aria-required="true"
        className="block w-full rounded-md border-0 py-2 px-3 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset bg-[#fdfdfdab] ring-gray-300 placeholder:text-gray-500"
      />
      <ErrorMessage
        name={name}
        component="span"
        className="text-red-500 text-sm"
      />
    </div>
  </div>
);

export default FormInput;
