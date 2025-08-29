import { Controller } from 'react-hook-form';
export default function CheckboxField({ name, label, className, control, rules }) {
    return (
        <div className='mb-4'>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <label className='inline-flex w-full items-center'>
                        <input
                            {...field}
                            type={"checkbox"}
                            className={`${className} mr-2 ${error ? "border-red-500" : "border-gray-300"}`}
                        />
                        {label}
                        {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
                    </label>
                )}
            />
        </div>
    )
}
