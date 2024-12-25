"use client"
import React, { ChangeEvent, createRef, useEffect, useState } from 'react'
import Button from '@/components/Button/Button'
import { PhotoIcon } from '@heroicons/react/24/solid'
import Input from '@/components/Input/Input'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Image from 'next/image'
import { User } from '@/types/user'
import { getStrapiMedia, uploadImageToStrapi } from '@/utils/apiHelpers'
import http from '@/utils/http'
import { useCustomMutation } from '@/hooks/useCustomMutation'
import { useQuery } from '@tanstack/react-query'
import { AuthsApi } from '@/apis/auths'

const ProfilePage = () => {
    const {data: profile} = useQuery({queryKey: ["profile"], queryFn: () => AuthsApi.getUserProfile()})
    const [image, setImage] = useState<string>("/default-avatar.png");
    const [file, setFile] = useState<File>();
    const [username, setUsername] = useState<string>("");
    const uploadRef = createRef<HTMLInputElement>();
    const { mutate } = useCustomMutation({ key: "auth", type: "update" })
    const handleUpload = () => {
        uploadRef.current?.click();
    }
    useEffect(() => {
        if (profile) {
            setImage(profile.avatarUrl || "/default-avatar.png")
            setUsername(profile.username)
        }
    }, [profile])
    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;

        if (!fileInput.files) {
            console.warn("no file was chosen");
            return;
        }

        if (!fileInput.files || fileInput.files.length === 0) {
            console.warn("files list is empty");
            return;
        }
        const file = fileInput.files[0];
        setFile(file)
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                console.error("something went wrong, check your console.");
                return;
            }

            const data: { fileUrl: string } = await res.json();

            setImage(data.fileUrl);
        } catch (error) {
            console.error("something went wrong, check your console.");
        }
    };
    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const handleSave = async () => {
        let data: { username: string; avatar?: number } = {
            username: username
        };
        let imageId;
        if (file) {
            imageId = await uploadImageToStrapi(file)
        }
        if (imageId) {
            data["avatar"] = imageId;
        }
        mutate(data);
    }
    return (
        <div className='w-1/2'>
            <h2 className='font-semibold text-4xl'>Profile</h2>
            <div className='flex gap-4 mt-8 flex-col'>
                <h3 className='text-sm font-semibold'>Avatar</h3>
                <Input onChange={handleImageUpload} ref={uploadRef} className='hidden' type='file' accept="image/*" />
                <div className='flex gap-4'>
                    <div className='relative w-[80px] h-[80px]'>
                        <Image alt="avatar" fill className='rounded-full' objectFit='cover' src={image} />
                    </div>
                    <div className='my-auto'>
                        <Button onClick={handleUpload} pattern='white' className='border border-neutral-200'>
                            <PhotoIcon className='w-5 h-5' />
                            <span className='text-sm font-semibold ml-2'>Change avatar</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 mt-4'>
                <h3 className='text-sm font-semibold'>User name</h3>
                <Input colorClass="bg-neutral-100" value={username} onChange={handleChangeUsername} rounded='rounded-lg' />
            </div>
            <ButtonPrimary onClick={handleSave} className='mt-4'>Save</ButtonPrimary>
        </div>
    )
}

export default ProfilePage

