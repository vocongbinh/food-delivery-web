"use client"
import React, { ReactNode, useState } from 'react'
import SecureIcon from "@/images/secure.svg";
import ProfileIcon from "@/images/profile.svg";
import NotifyIcon from "@/images/notify.svg";
import Profile from './profile';
import Security from './security';
import Notification from './notification';

import { useCustomQuery } from '@/hooks/useCustomQuery';
import { User } from '@/data/types';

interface SettingOption {
    id: number;
    icon: ReactNode;
    title: string;
    component: ({ user }: { user: User }) => React.JSX.Element;
}
const settingOptions: SettingOption[] = [
    {
        id: 0,
        icon: <ProfileIcon />,
        title: "Profile",
        component: Profile
    },
    {
        id: 1,
        icon: <SecureIcon />,
        title: "Account Security",
        component: Security
    },
    {
        id: 2,
        icon: <NotifyIcon />,
        title: "Notification",
        component: Notification
    }
]

const Settings = () => {
    const [selectedOption, setSelectedOption] = useState<SettingOption>(settingOptions[0]);
    const handleSelectOption = (option: SettingOption) => {
        setSelectedOption(option);
    }
    const { data, isLoading } = useCustomQuery<User>({
        key: "users/me"
    })
    const renderMenu = () => {
        return settingOptions.map((item, index) => (
            <div key={index}
                onClick={() => handleSelectOption(item)}
                className={`w-full flex items-center cursor-default transition-colors duration-300 ease-in-out gap-4 hover-bg bg-neutral-200 px-4 py-2 rounded-xl
        ${selectedOption.id === item.id ? "bg-neutral-200" : "bg-white hover:bg-neutral-100"} `}>
                <div className="flex items-center justify-center">
                    {item.icon}
                </div>
                <span className="text-sm font-semibold">{item.title}</span>
            </div>
        ))
    }
    if (isLoading) return <></>;
    else {
        const Component = selectedOption.component;
        return (
            <div className='container bg-white py-10'>
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 flex flex-col gap-4">
                        {renderMenu()}
                    </div>
                    <div className="col-span-3">
                        <Component user={data as User} />
                    </div>
                </div>
            </div>
        )
    }

}

export default Settings;