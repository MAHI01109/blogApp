import React from 'react'
import { Controller } from 'react-hook-form'
import Select from "react-select";



const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#1f2937', // Tailwind gray-800
    borderColor: '#374151',     // Tailwind gray-700
    color: 'white',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#4B5563',   // Tailwind gray-600
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#1f2937', // same as control
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#4f46e5' // indigo-600
      : state.isFocused
      ? '#374151' // gray-700
      : '#1f2937', // gray-800
    color: state.isSelected || state.isFocused ? 'white' : '#d1d5db', // gray-300
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af', // gray-400
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
  }),
};
export default function SelectField({ name,
    control,
    label,
    labelClassName,
    placeholder = '',
    className,
    rules, options }) {
    return (
        <div className='mb-4'>
            {label && (
                <label htmlFor={name} className={`${labelClassName} block text-sm font-medium text-gray-700 mb-3`} >{label}</label>
            )}
            <Controller
                name={name}
                control={control}
                defaultValue={''}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Select
                            {...field}
                            styles={customStyles}
                            options={options}
                            className={`${className}`}
                            placeholder={placeholder}
                        />

                        {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
                    </>
                )}
            />

        </div>
    )
}
