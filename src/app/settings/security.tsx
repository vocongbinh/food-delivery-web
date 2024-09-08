"use client"
import Button from '@/components/Button/Button'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Input from '@/components/Input/Input'
import ModalChangePassword from '@/components/ModalChangePassword/ModalChangePassword'
import { User } from '@/data/types'
import { useCustomMutation } from '@/hooks/useCustomMutation'
import { maskEmail } from '@/utils/maskHelpers'
import { validatePassword } from '@/utils/validateHelpers'
import React, { useState } from 'react'
const Security = ({ user }: { user: User }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [confirmedPassword, setConfirmedPassword] = useState<string>('');
    const { mutate } = useCustomMutation({ key: "users", type: "update", id: user.id })
    const handleConfirm = () => {
        if(!validatePassword(password)) {
            alert("Password is not valid");
            return;
        }
        if (password !== confirmedPassword) {
            alert("Passwords do not match");
            return;
        }
        mutate({ password });
        setIsOpen(false);
    }
    const renderModalContent = () => {
        return (
            <div className="flex flex-col">
                <Input onChange={(e) => setPassword(e.target.value)} validate={validatePassword(password)} label='New password' type='password' />
                <ul className="list-disc mx-8 text-sm text-neutral-500 mt-4 mb-6">
                    <li>Use 8+ characters</li>
                    <li>At least 1 number</li>
                    <li>At least 1 upper case letter</li>
                </ul>
                <Input value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} showEye label='Confirm Password' type='password' />
                <ButtonPrimary onClick={handleConfirm} className='w-full mt-4'>Confirm</ButtonPrimary>
            </div>


        );
    };
    const handleClose = () => {
        setPassword("");
        setConfirmedPassword("");
    }
    return (
        <div className='w-full flex flex-col gap-8'>
            <h2 className='font-semibold text-4xl'>Account Security</h2>
            <h2 className='font-semibold text-lg'>Account information</h2>
            <div className='flex justify-between'>
                <div>
                    <h2 className='text-sm font-semibold'>E-mail address</h2>
                    <h2 className="text-neutral-500 text-sm">Use your email to protect your account and transactions</h2>
                </div>
                <div className='flex gap-4 items-center'>
                    <span>{maskEmail(user.email)}</span>
                    <Button fontSize='text-sm font-semibold' pattern='white' className='border border-neutral-500'>Manage</Button>
                </div>
            </div>
            <div className='flex justify-between'>
                <div>
                    <h2 className='text-sm font-semibold'>Set Password</h2>
                    <h2 className="text-neutral-500 text-sm">Set a unique password for better protection</h2>
                </div>
                <ModalChangePassword
                    onCloseModal={handleClose}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    renderTrigger={(openModal) => (
                        <Button onClick={openModal} fontSize='text-sm font-semibold' pattern='white' className='border border-neutral-500'>Set password</Button>
                    )}
                    modalTitle="Change password"
                    renderContent={renderModalContent}
                />

            </div>
            <div className='flex justify-between'>
                <div>
                    <h2 className='text-sm font-semibold'>Authenticator App</h2>
                    <h2 className="text-neutral-500 text-sm">Use Google Authenticator to protect your account and transactions</h2>
                </div>
                <div className='flex gap-4 items-center text-sm'>
                    <span className='text-neutral-500' >status: <span className='text-black'>off</span></span>
                    <Button fontSize='font-semibold' pattern='white' className='border border-neutral-500'>Manage</Button>

                </div>
            </div>



        </div>
    )
}

export default Security