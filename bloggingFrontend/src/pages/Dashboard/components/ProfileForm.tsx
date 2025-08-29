
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

import Step1 from "./updateForm/Step1";
import Step2 from "./updateForm/Step2";
import Step3 from "./updateForm/Step3";




const addressSchema = yup.object().shape({
    country: yup.string().required('Country is required'),
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zipCode: yup.string().required('Zip Code is required'),
});


const ProfileSchema = yup.object({
    username: yup.string().required('Username is required'),
    bio: yup.string().required('Bio is required'),
    contact: yup.string().required('Contact is required'),
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().required('email is required'),
    addresses: yup.array().of(addressSchema)
});

export default function ProfileForm({ user, setUpdate, update,fetchAuthStatus }) {
    const [step, setStep] = useState(0);
    const steps = [<Step1 />, <Step2 />, <Step3 />];
    const navigate = useNavigate();

    const methods = useForm({
        resolver: yupResolver(ProfileSchema),
        defaultValues: {
            ...user,
        },
        mode: "onBlur"
    });


    const onSubmit = async (data) => {
        if (step === steps.length - 1) {
            try {
                const response = await axios.post('auth/update', data);
                if (response.status === 200) {
                    toast.success("Profile updated successfully");
                    setUpdate(false);
                    fetchAuthStatus();
                    // navigate("/admin/user-profile");

                }
            } catch (error) {
                console.log(error);
                toast.error("Update failed");
            }
        } else {
            setStep((prev) => prev + 1);
        }
    };


    return (
        <FormProvider {...methods}>

            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="p-12 bg-gray-800 rounded-md"
            >
                <div className="space-y-12 ">
                    {/* Progress bar */}
                    <div className="flex justify-between mb-4">
                        {["1", "2", "3",].map((s, i) => (
                            <div
                                key={i}
                                className={`
                                    w-8 h-8 flex items-center justify-center rounded-full
                                     ${i <= step ? "bg-orange-500 text-white" : "bg-gray-300 text-black"}`}
                            >
                                {s}
                            </div>
                        ))}
                    </div>

                    {steps[step]}

                    <div className="flex justify-between mt-4">
                        {step > 0 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    Back
                                </button>
                            </>

                        )}
                        <button
                            type={step === steps.length - 1 ? 'submit' : 'button'}
                            className="bg-orange-500 text-white px-4 py-2 rounded"
                            onClick={step === steps.length - 1 ? undefined : () => setStep(step + 1)
                            }
                        >
                            {step === steps.length - 1 ? "Submit" : "Next"}
                        </button>
                    </div>
                </div>
            </form>
        </FormProvider>

    )
}
