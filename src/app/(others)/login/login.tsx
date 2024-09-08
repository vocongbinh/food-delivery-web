"use client"
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Input from '@/components/Input/Input'
import React, { useState } from 'react'
import Forgot from './forgot'
import LoginSocials from './loginSocials'
import { AuthApi, SignInProps } from '@/apis/authApi'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
    identifier: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, "Too Short!").required("Password is required"),
});
const initialValues: SignInProps = {
    identifier: "",
    password: ""
}
const Login = () => {
    const [forgot, setForgot] = useState(false);
    const [error, setError] = useState<string>("");
    const handleSubmit = async (values: SignInProps) => {
        try {
            const res = await AuthApi.login(values);
            window.location.href = '/login-success';
        }
        catch (e: any) {
            setError(e.message);
        }
    }
    const handleForgot = () => {
        setForgot(true);
    }
    return (
        forgot ? <Forgot setForgot={setForgot} /> : <>
            <Formik<SignInProps>
                initialValues={initialValues}
                validationSchema={SignInSchema}
                onSubmit={handleSubmit}
            >
                {(FormikState) => {
                    const errors = FormikState.errors;
                    return <Form className="grid grid-cols-1 gap-6 mt-8">
                        <div>
                            <label className="block">
                                <span className="text-neutral-800 dark:text-neutral-200 font-semibold">
                                    Email address
                                </span>
                            </label>
                            <Input
                                isFormik={true}
                                name='identifier'
                                type="email"
                                placeholder="Enter your email address..."
                                className="mt-1 py-2 rounded-lg"
                            />
                            {!!errors.identifier && (
                                <div className="text-sm text-red-500 mt-1">
                                    {errors.identifier}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block">
                                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 font-semibold">
                                    Password
                                    <span onClick={handleForgot} className="text-sm text-primary-500 hover:text-primary-700">
                                        Forgot password?
                                    </span>
                                </span>
                            </label>
                            <Input showEye isFormik={true} name='password' type="password" className="mt-1 py-2 rounded-lg" placeholder="Enter your password..." />
                            {!!errors.password && (
                                <div className="text-sm text-red-500 mt-1">
                                    {errors.password}
                                </div>
                            )}
                        </div>
                        {error && <span className='text-sm text-red-500'>{error}</span>}

                        <ButtonPrimary type="submit">Login</ButtonPrimary>
                    </Form>
                }}

            </Formik>

            <LoginSocials />
        </>

    )
}

export default Login