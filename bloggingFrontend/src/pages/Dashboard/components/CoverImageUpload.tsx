import { useState } from 'react'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import ReactImageUploading from 'react-images-uploading'
import axios from '../../../api/axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../../context/AuthContext';
import * as yup from 'yup';
import { toast } from 'react-toastify';

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


const coverImage = yup.object({
    coverImage: fileSchema
})



function CoverImageUpload({ defaultImage, onImageChange }) {

    const [image, setImage] = useState(defaultImage ? [{ data_url: defaultImage, file: null }] : []);

    const onChange = (imageList) => {
        setImage(imageList);
        onImageChange?.(imageList[0]?.file || imageList[0]?.data_url || null);
    }
    return (
        <ReactImageUploading
            value={image}
            onChange={onChange}
            maxNumber={1}
            dataURLKey='data_url'
            acceptType={['jpg', 'gif', 'png', 'jpeg']}
        >
            {({
                imageList,
                onImageUpdate,
            }) => (
                <div className='flex w-full flex-col justify-center items-center gap-2'>
                    <img alt='Image' src={imageList[0]?.data_url} className='w-full h-36 rounded-lg' />
                    <button type='button' onClick={() => onImageUpdate(0)} className='p-2 bg-indigo-500 text-white rounded' >
                        Update
                    </button>
                </div>
            )}
        </ReactImageUploading>
    )
};

export const UserCoverImage = ({ openCoverImage, setOpenCoverImage, coverImage_Url }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ resolver: yupResolver(coverImage) });
    const { fetchAuthStatus } = useAuth()
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const respose = await axios.post('auth/cover-image', data, {

                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (respose.status === 200) {
                fetchAuthStatus();
                toast.success(respose.data.message);
                setOpenCoverImage(false)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }
    return (
        <>
            <Dialog open={openCoverImage} onClose={setOpenCoverImage} className="relative z-10">
                <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel transition className="relative transform overflow-hidden rounded-lg
                                 bg-white text-center shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300
                                 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95" >
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-center bg-white">
                                        <div className="mt-3 text-center sm:mt-0  sm:text-center flex flex-col w-full">
                                            <DialogTitle as="h1" className="text-xl  font-semibold text-gray-900">Update Cover Image </DialogTitle>
                                            <div className="mt-2">
                                                <div className='flex justify-center items-center w-full'>
                                                    <CoverImageUpload
                                                        error={errors?.coverImage}
                                                        defaultImage={coverImage_Url}
                                                        onImageChange={(fileOrUrl) => setValue("coverImage", fileOrUrl)}
                                                    />
                                                    <input type='hidden' {...register("coverImage", { required: true })} />
                                                    {errors.coverImage && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.coverImage.message}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type='submit'className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto" >
                                        Save
                                    </button>
                                    <button type="button" data-autofocus onClick={() => setOpenCoverImage(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" >
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
