import { AuthApi } from '@/apis/authApi'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Input from '@/components/Input/Input'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

const Forgot = ({ setForgot }: { setForgot: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [email, setEmail] = useState<string>("");
    const handleBack = () => {
        setForgot(false);
    }
    const handleForgot = async () => {
        console.log("forgot")
        await AuthApi.forgotPassword(email);
    }
    return (
        <div className='grid gap-2 pt-6'>
            <ArrowLeftIcon onClick={handleBack} className='w-10 h-10' />
            <h2 className='text-lg font-semibold'>Forgot your password</h2>
            <p>Enter your email below, you will receive an email with instructions on how to reset your password in a few minutes. You can also set a new password if you’re never set one before.</p>
            <label className="block mt-4">
                <span className="text-neutral-800 dark:text-neutral-200 font-semibold">
                    Enter your e-mail address
                </span>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email address..."
                    className="mt-1 py-2 rounded-lg"
                />
            </label>
            <ButtonPrimary onClick={handleForgot} className='mt-4' type="submit">Send instructions</ButtonPrimary>
        </div>

    )
}

export default Forgot