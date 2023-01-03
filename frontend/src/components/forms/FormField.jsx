
export default function FormField({ register, name, label, type, placeholder, required, defaultValue=null }) {
    return (
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                {label}
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input

                    type={type}
                    name={name}
                    id={name}
                    autoComplete={name}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600 sm:max-w-xs sm:text-sm"
                    {...register(name, { required: required })}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    );
}