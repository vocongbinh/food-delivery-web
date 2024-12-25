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
import { UserInfo } from '@/types'
import { Dropdown, MenuProps, Select, Space, Typography } from 'antd'
import { uploadImage } from '@/utils/imageHelper'
import { toast } from 'react-toastify'

const activityItems: { value: string, label: string }[] = [
    {
        value: 'Little/no exercise',
        label: 'Little/no exercise',
    },
    {
        value: 'Light exercise',
        label: 'Light exercise',
    },
    {
        value: 'Moderate exercise (3-5 days/week)',
        label: 'Moderate exercise (3-5 days/week)',
    },
    {
        value: 'Very active (6-7 days/week)',
        label: 'Very active (6-7 days/week)',
    },
    {
        value: 'Extra active (very active & physical job)',
        label: 'Extra active (very active & physical job)',
    }
];
const weightLossItems: { value: string, label: string }[] = [
    {
        value: 'Maintain weight',
        label: 'Maintain weight',
    },
    {
        value: 'Mild weight loss',
        label: 'Mild weight loss',
    },
    {
        value: 'Weight loss',
        label: 'Weight loss',
    },
    {
        value: 'Extreme weight loss',
        label: 'Extreme weight loss',
    }
]
const Profile = ({user}: {user: UserInfo}) => {
    const profile = user;
    console.log(profile)
    const [image, setImage] = useState<string>("/default-avatar.png");
    const [file, setFile] = useState<File>();
    const [weightLoss, setWeightLoss] = useState<string>("");
    const [activity, setActivity] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const uploadRef = createRef<HTMLInputElement>();
    const { mutate } = useCustomMutation({ key: "auth", type: "update", queryKey:["profile"] })

    const handleUpload = () => {
        uploadRef.current?.click();
    }

    useEffect(() => {
        if (profile) {
            setImage(profile.avatarUrl || "/default-avatar.png")
            setUsername(profile.username)
            setWeightLoss(profile.weightLoss || "")
            setActivity(profile.activity || "")
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

    const handleChangeWeightLoss = (value: string) => {
        setWeightLoss(value)
    }

    const handleChangeActivity = (value: string) => {
        setActivity(value)
    }

    const handleSave = async () => {
        let data: Partial<UserInfo> = {
            username: username,
            weightLoss: weightLoss,
            activity: activity
        };
        let image: string = "";
        if (file) {
            image = await uploadImage(file)
        }
        if (image) {
        data["avatarUrl"] = image;
        }
        console.log(data);
        mutate(data);
        toast.success("Profile updated successfully")
    }

    return (
        <div className='w-full max-w-4xl mx-auto pb-10'>
            {/* Cover Image */}
            <div className='relative w-full h-48 bg-gradient-to-r from-blue-200 to-yellow-100 rounded-b-lg'></div>

            {/* Profile Section */}
            <div className='px-8 -mt-20'>
                <div className='flex justify-between items-start mb-8'>
                    <div className='flex items-end'>
                        <div className='relative w-[150px] h-[150px] border-4 border-white rounded-full overflow-hidden'>
                            <Image
                                alt="avatar"
                                fill
                                className='rounded-full'
                                style={{ objectFit: 'cover' }}
                                src={image}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-start justify-between">
                    <div className='mb-8'>
                        <h1 className='text-3xl font-bold mb-2'>Profile</h1>
                        <p className='text-gray-600'>Update your photo and personal details</p>
                    </div>
                    <ButtonPrimary onClick={handleSave} className='px-8'>Save</ButtonPrimary>

                </div>


                <Input onChange={handleImageUpload} ref={uploadRef} className='hidden' type='file' accept="image/*" />

                <div className='space-y-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Username</label>
                        <Input
                            value={username}
                            onChange={handleChangeUsername}
                            rounded='rounded-lg'
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Weight Loss</label>
                        <Select
                            className="w-full !h-[42px]"
                            defaultValue={profile.weightLoss || weightLossItems[0].value}
                            onChange={handleChangeWeightLoss}
                            options={weightLossItems}
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Activity Level</label>
                        <Select
                            className="w-full !h-[42px]"
                            defaultValue={profile.activity || activityItems[0].value}
                            onChange={handleChangeActivity}
                            options={activityItems}
                        />
                    </div>

                    <div className='flex items-center gap-4'>
                        <label className='block text-sm font-medium text-gray-700'>Your Photo</label>
                        <Button
                            onClick={handleUpload}
                            pattern='white'
                            className='border border-gray-300 hover:bg-gray-50'
                        >
                            <PhotoIcon className='w-5 h-5' />
                            <span className='ml-2'>Update</span>
                        </Button>
                        <button className='text-sm text-gray-600 hover:text-gray-900'>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
