"use client"
import NotificationItem from '@/components/NotificationItem/NotificationItem'
import { Setting } from '@/types/setting'
import { useCustomMutation } from '@/hooks/useCustomMutation'
import { UserInfo } from '@/types'
import { DEFAULT_SETTINGS } from '@/types/setting'
import React, { useEffect, useState } from 'react'
const Notification = ({ user }: { user: UserInfo }) => {
    console.log(user)
    const settings = DEFAULT_SETTINGS;
    console.log(settings);
    const { mutate } = useCustomMutation({ key: "auth", type: "update", queryKey:["profile"] })
    const [settingsData, setSettingsData] = useState<Setting[]>(DEFAULT_SETTINGS);
    const updateUserSettings = async () => {
        try {
            const settings = localStorage.getItem("user_settings");
            const settingsArray = settings ? JSON.parse(settings) : [];
            mutate({ settings: settingsArray });
        } catch (err) { }
    };
    useEffect(() => {
        localStorage.setItem(
            "user_settings",
            JSON.stringify(settingsData.map((sd) => sd.id))
        );
    }, [settingsData]);
    useEffect(() => {
        return () => {
            updateUserSettings();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col gap-8 w-full">
            <h2 className='font-semibold text-4xl'>Notification Settings</h2>
            {(settings as Setting[] || []).map((item, index) => <NotificationItem key={index} setting={item} data={settingsData} setData={setSettingsData} />)}
        </div>
    )
}

export default Notification