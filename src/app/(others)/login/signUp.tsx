"use client"
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Checkbox from '@/components/Checkbox/Checkbox'
import Input from '@/components/Input/Input'
import React from 'react'
import LoginSocials from './loginSocials'
import { AuthApi, SignUpProps } from '@/apis/authApi'
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
const SignUpSchema = Yup.object().shape({
    username: Yup.string()
        .required('User name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, "Too Short!").required("Password is required"),
});
const initialValues: SignUpProps = {
    username: "",
    email: "",
    password: ""
}
const SignUp = () => {
    const router = useRouter();
    const handleSubmit = async (values: SignUpProps) => {
        try {
            await AuthApi.signUp(values)
            router.push("/login-success");
        }
        catch (e) {
            throw e;
        }
    }
    return (
        <>
            <Formik<SignUpProps>
                initialValues={initialValues}
                validationSchema={SignUpSchema}
                onSubmit={handleSubmit}
            >
                {(FormikState) => {
                    const errors = FormikState.errors;
                    return (<Form className="grid grid-cols-1 gap-6 mt-8" >
                        <div>
                            <label className="block">
                                <span className="text-neutral-800 dark:text-neutral-200 font-semibold">
                                    User name
                                </span>
                            </label>
                            <Input name='username'
                                isFormik={true}
                                placeholder="Enter your user name..."
                                className="mt-1 py-2 rounded-lg" />
                            {!!errors.username && (
                                <div className="text-sm text-red-500 mt-1">
                                    {errors.username}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block">
                                <span className="text-neutral-800 dark:text-neutral-200 font-semibold">
                                    Email address
                                </span>
                            </label>
                            <Input name='email'
                                isFormik={true}

                                type="email"
                                placeholder="Enter your email address..."
                                className="mt-1 py-2 rounded-lg" />
                            {!!errors.email && (
                                <div className="text-sm text-red-500 mt-1">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block">
                                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 font-semibold">
                                    Password
                                </span>
                            </label>
                            <Input isFormik={true} name='password' type="password" className="mt-1 py-2 rounded-lg" placeholder="Enter your password..." />
                            {!!errors.password && (
                                <div className="text-sm text-red-500 mt-1">
                                    {errors.password}
                                </div>
                            )}
                            <span className='text-neutral-400 text-sm'>Password must be 8 or more characters, and can include numbers and symbols</span>

                        </div>

                        {/* <Input name='password' type="password" className="mt-1 py-2 rounded-lg" placeholder="Enter your password..." /> */}

                        <div className='flex gap-2'>
                            <Checkbox name='haha' />
                            <h2 className='text-xs'>Please keep me updated by email with the latest crypto news, research findings, reward programs, event updates, coin listing and more information from TonStation.</h2>
                        </div>
                        <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
                    </Form>)
                }
                }

            </Formik>

            <LoginSocials />
        </>

    )
}

export default SignUp