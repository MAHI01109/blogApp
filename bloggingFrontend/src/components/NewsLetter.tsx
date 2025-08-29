import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SubscribeSchema = Yup.object({
    useremail: Yup.string().email("Invalid email address").required("Your email is required")
})
export default function NewsLetter() {
    const { register, formState: { errors }, handleSubmit } = useForm({ resolver: yupResolver(SubscribeSchema) })
    const onSubmit = data => console.log(data);

    return (
        <>
            <Card className="h-60 border-0 ">
                <CardHeader>
                    <CardTitle className="text-center mb-3 text-4xl font-bold text-orange-500 ">
                        Subscribe Now
                    </CardTitle>
                    <CardDescription className="text-center md:text-md lg:text-md text-accent">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry.
                    </CardDescription>
                </CardHeader>
                <CardContent className="mx-auto max-w-2xl w-full my-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex w-full h-16 p-4  justify-center items-center border rounded-4xl">
                            <Input
                                {...register('useremail')}
                                type="text"
                                placeholder="Enter your email "
                                className=" w-full outline-none border-0 rounded-none p-3 focus-visible:ring-card" />
                            <Button type="submit" className="rounded-4xl text-md p-6 px-8" variant={'outline'}>Subscribe</Button>
                        </div>
                        {errors?.useremail && <span className="text-center text-red-600 text-sm p-3">{errors.useremail.message}</span>}
                    </form>
                </CardContent>
            </Card>
        </>
    );
};
