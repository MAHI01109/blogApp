import { useFormContext } from "react-hook-form"
import { ChevronDownIcon } from '@heroicons/react/16/solid';
export default function Step4() {
    const { register, formState } = useFormContext();
    const { errors } = formState;
  return (
    <>
        <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">Address</h2>
                <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">Use a permanent address where you can receive mail.</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                            Country
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                                name="addresses[0].country"
                                {...register("addresses[0].country")}
                                autoComplete="country-name"
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                                <option value={'United States'}>United States</option>
                                <option value={'Canada'}>Canada</option>
                                <option value={'Mexico'}>Mexico</option>
                            </select>
                            <ChevronDownIcon
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                            {errors.addresses && errors?.addresses[0]?.country && (
                                <p className="mt-1 text-sm text-red-600">{errors.addresses[0].country.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                            Street address
                        </label>
                        <div className="mt-2">
                            <input
                                name="addresses[0].street"
                                {...register("addresses[0].street")}
                                type="text"
                                autoComplete="street-address"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.addresses && errors?.addresses[0]?.street && (
                                <p className="mt-1 text-sm text-red-600">{errors.addresses[0].street.message}</p>
                            )}
                        </div>
                    </div>


                    <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                            City
                        </label>
                        <div className="mt-2">
                            <input
                                id="city"
                                name="addresses[0].city"
                                {...register("addresses[0].city")}
                                type="text"
                                autoComplete="address-level2"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.addresses && errors?.addresses[0]?.city && (
                                <p className="mt-1 text-sm text-red-600">{errors.addresses[0].city.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                            State / Province
                        </label>
                        <div className="mt-2">
                            <input
                                name="addresses[0].state"
                                type="text"
                                {...register("addresses[0].state")}
                                autoComplete="address-level1"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.addresses && errors?.addresses[0]?.state && (
                                <p className="mt-1 text-sm text-red-600">{errors.addresses[0].state.message}</p>
                            )}

                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                            ZIP / Postal code
                        </label>
                        <div className="mt-2">
                            <input
                                name="addresses[0].zipCode"
                                type="text"
                                {...register("addresses[0].zipCode")}
                                autoComplete="postal-code"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.addresses && errors?.addresses[0]?.zipCode && (
                                <p className="mt-1 text-sm text-red-600">{errors.addresses[0].zipCodemessage}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
