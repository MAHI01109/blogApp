import { useFormContext } from "react-hook-form"
// import { ImageUploader } from '../FileUploadPreview';

export default function Step2({ user }) {
    const { register, formState, setValue } = useFormContext();
    const { errors } = formState;
    return (
        <div>
            {/* <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-3xl font-semibold text-white">Profile Image</h2>
                <p className="mt-1 text-sm/6 text-gray-300">
                    This information will be displayed publicly so be careful what you share.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-1">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">Profile Image</label>
                            <ImageUploader
                                type="profile"
                                error={errors.profileImage}
                                defaultImage={user?.profileImage}
                                onImageChange={(fileOrUrl) => setValue("profileImage", fileOrUrl)} />
                            <input type="hidden" {...register("profileImage", { required: true })} />
                            {errors.profileImage && (
                                <p className="mt-1 text-sm text-red-600">{errors.profileImage.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-span-5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">Cover Image</label>
                        <ImageUploader
                            type="cover"
                            defaultImage={user?.coverImage}
                            onImageChange={(fileOrUrl) => setValue("coverImage", fileOrUrl)}
                            error={errors.coverImage}
                        />
                        <input type="hidden" {...register('coverImage', { required: true })} />
                        {errors.coverImage && (
                            <p className="mt-1 text-sm text-red-600">{errors.coverImage.message}</p>
                        )}
                    </div>
                </div>
            </div> */}
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">Personal Information</h2>
                <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">Use a permanent address where you can receive mail.</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                name="firstname"
                                type="text"
                                {...register('firstname', { required: true })}
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.firstname && (
                                <p className="mt-1 text-sm text-red-600">{errors.firstname.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                                id="last-name"
                                name="last-name"
                                {...register('lastname', { required: true })}
                                type="text"
                                autoComplete="family-name"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.lastname && (
                                <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                name="email"
                                {...register('email', { required: true })}
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                            Contact
                        </label>
                        <div className="mt-2">
                            <input
                                name="contact"
                                {...register('contact', { required: true })}
                                type="tel"
                                autoComplete="contact"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.contact && (
                                <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
