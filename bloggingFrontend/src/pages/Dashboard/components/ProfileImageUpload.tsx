import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react'
import ReactImageUploading from 'react-images-uploading'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import * as yup from 'yup';
import axios from '../../../api/axios';
import { useAuth } from '../../../context/AuthContext';
const fileSchema = yup
    .mixed()
    .test("required", "Image is required", value => {
        return value instanceof File || typeof value === "string";
    })
    .test("fileType", "Unsupported file type", value => {
        if (value instanceof File) {
            return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
        }
        return true; // skip type check for URL string
    });

const profileImage = yup.object({
    profileImage: fileSchema
})


const ProfileImageUpload = ({ onImageChaange, error, defaultImage, }) => {
    const [images, setImages] = useState(defaultImage ? [{ data_url: defaultImage, file: null }] : []);

    const onChange = (imageList) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
        onImageChaange?.(imageList[0]?.file || imageList[0]?.data_url || null);
        setImages(imageList);
    };

    return (
        <ReactImageUploading
            value={images}
            onChange={onChange}
            maxNumber={1}
            dataURLKey='data_url'
            acceptType={['jpg', 'gif', 'png', 'jpeg']}
        >
            {({
                imageList,
                onImageUpdate,

            }) => (
                <>
                    <div className="flex justify-center items-center gap-2">
                        <img src={imageList[0].data_url} className='size-24' />
                        <div>
                            <button type='button' onClick={() => onImageUpdate()}
                                className='p-2 bg-blue-500 text-white rounded'>update</button>
                            <button type='button' className='p-2'></button>
                        </div>
                    </div>
                </>
            )}
        </ReactImageUploading>
    )
}

export const UserProfileImage = ({ open, setOpen, avatar }) => {
    const { fetchAuthStatus } = useAuth();
    const { register, handleSubmit, formState, setValue } = useForm({ resolver: yupResolver(profileImage) })
    const { errors } = formState;

    const onsubmit = async (data) => {
        try {
            const updateResponse = await axios.post('auth/avatar', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            fetchAuthStatus();
            console.log(updateResponse, "res");

        } catch (error) {
            console.log(error);

        }


    }

    return (
        <>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel transition className="relative transform overflow-hidden rounded-lg
                         bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300
                         data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm data-closed:sm:translate-y-0 data-closed:sm:scale-95" >
                            <form onSubmit={handleSubmit(onsubmit)} >
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center flex flex-col">
                                            <DialogTitle as="h1" className="text-xl  font-semibold text-gray-900">Update profile Image </DialogTitle>
                                            <div className="mt-2">
                                                <div className='flex'>
                                                    <ProfileImageUpload
                                                        error={errors?.profileImage}
                                                        defaultImage={avatar}
                                                        onImageChaange={(fileOrUrl) => setValue("profileImage", fileOrUrl)}
                                                    />
                                                    <input type='hidden' {...register("profileImage", { required: true })} />
                                                    {errors.profileImage && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.profileImage.message}</p>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type='submit' onClick={() => setOpen(false)} className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto" >
                                        Save
                                    </button>
                                    <button type="button" data-autofocus onClick={() => setOpen(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" >
                                        Cancel </button>
                                </div>
                            </ form>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

        </>

    )

}
