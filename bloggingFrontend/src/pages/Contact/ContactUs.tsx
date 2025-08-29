import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from '@/api/axios';
import { toast } from 'react-toastify';

const querySchema = yup.object({
    name: yup.string().required('name is required'),
    email: yup.string().required('email is required'),
    usermessage: yup.string().required('contact is required'),
});

export default function ContactUs() {
    const { register, handleSubmit, formState, } = useForm({ resolver: yupResolver(querySchema) })
    const { errors } = formState;

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await axios.post('contact-us/query', data);
            if (res.status === 200) {
                toast.success(res.data.message);
            };
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <section className="p-6 section-spacing dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                <form onSubmit={handleSubmit(onSubmit)} className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow bg-gray-50 dark:bg-gray-900">
                    <h2 className="w-full text-3xl font-bold leading-tight">Contact us</h2>
                    <div>
                        <label htmlFor="name" className="block mb-1 ml-1">Name</label>
                        <input id="name" {...register('name')} type="text" placeholder="Your name" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-orange-600 focus:dark:ring-orange-400 bg-gray-100 dark:bg-gray-800" />
                        {errors?.name && <p className='text-sm text-red-500 p-2'>*{errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 ml-1">Email</label>
                        <input id="email" {...register('email')} type="email" placeholder="Your email" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-orange-600 focus:dark:ring-orange-400 bg-gray-100 dark:bg-gray-800" />
                        {errors?.email && <p className='text-sm text-red-500 p-2'>*{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-1 ml-1">Message</label>
                        <textarea id="message" {...register('usermessage')} type="text" placeholder="Message..." className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-orange-600 focus:dark:ring-orange-400 bg-gray-100 dark:bg-gray-800"></textarea>
                        {errors?.usermessage && <p className='text-sm text-red-500 p-2'>*{errors.usermessage.message}</p>}
                    </div>
                    <div>
                        <button type="submit" className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-orange-600 dark:bg-orange-400 focus:ring-orange-600 focus:dark:ring-orange-400 hover:ring-orange-600 hover:dark:ring-orange-400 text-gray-50 dark:text-gray-900">Send</button>
                    </div>
                </form>
            </section>
        </div>
    )
}
