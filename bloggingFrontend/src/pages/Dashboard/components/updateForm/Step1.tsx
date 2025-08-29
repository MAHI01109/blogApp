import { useFormContext } from "react-hook-form"

export default function Step1() {
    const { register, formState } = useFormContext();
    const { errors } = formState;

    return (
        <>
            <div className="border-b border-gray-900/10">
                <h2 className="text-3xl font-semibold text-white">Profile</h2>
                <p className="mt-1 text-sm/6 text-gray-300">
                    This information will be displayed publicly so be careful what you share.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                            Username
                        </label>
                        <div className="mt-2">
                            <div className={`flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-800 `}>
                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">workcation.com/</div>
                                <input
                                    type="text"
                                    placeholder="janesmith"
                                    className={`block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-600 focus:outline-none sm:text-sm/6 
                                                     ${errors.username ? "border-red-500 border-dashed" : "border-dashed border-gray-400 dark:border-gray-600"}`}
                                    {...register("username")}

                                />
                            </div>
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50 ">
                            About
                        </label>
                        <div className="mt-2">
                            <textarea
                                rows={3}
                                {...register("bio", { required: true, })}
                                className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 dark:text-gray-60 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                defaultValue={''}
                            />
                            {errors.bio && (
                                <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                            )}
                        </div>
                        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-50">Write a few sentences about yourself.</p>
                    </div>

                </div>
            </div>
        </>
    )
}
