"use client"
// import { AuthApi } from '@/apis/authApi'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Input from '@/components/Input/Input'
import { validatePassword } from '@/utils/validateHelpers'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const ChangePass = () => {
    const searchParams = useSearchParams();
    const [password, setPassword] = useState<string>('');
    const [confirmedPassword, setConfirmedPassword] = useState<string>('');
    const router = useRouter();
    const handleConfirm = async () => {
        if (!validatePassword(password)) {
            alert("Password is not valid");
            return;
        }
        if (password !== confirmedPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            // await AuthApi.resetPassword({ code: searchParams.get('code') as string, password, passwordConfirmation: confirmedPassword });
            // router.push("/change-pass-success")
        }
        catch (e: any) {
            alert(e.message);
        }
    }
    return (
        <div className='grid gap-2'>
            <h2 className='text-4xl font-semibold mb-4'>Change password</h2>
            <div className="flex flex-col">
                <Input sizeClass='rounded-lg' onChange={(e) => setPassword(e.target.value)} validate={validatePassword(password)} label='New password' type='password' />
                <ul className="list-disc mx-8 text-sm text-neutral-500 mt-4 mb-6">
                    <li>Use 8+ characters</li>
                    <li>At least 1 number</li>
                    <li>At least 1 upper case letter</li>
                </ul>
                <Input sizeClass='rounded-lg' value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} showEye label='Confirm Password' type='password' />
                <ButtonPrimary onClick={handleConfirm} className='w-full mt-4'>Confirm</ButtonPrimary>
            </div>

        </div>

    )
}

export default ChangePass