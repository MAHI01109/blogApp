import React from 'react'
import { Controller } from 'react-hook-form';

export default function TextField({ name, label, labelclassName, className, control, placeholder = " ", type = "text", rules }) {
    return (
        <div className='mb-4'>
            {
                label && (
                    <label htmlFor={name} className={`${labelclassName} block text-sm font-medium text-gray-700 mb-1`}>
                        {label}
                    </label>
                )
            }
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            className={`${className} w-full p-2 border rounded-md focus:outline-none ${error ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}

                    </>
                )}
            />
        </div>
    )
}