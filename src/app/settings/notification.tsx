"use client"
import { AuthApi } from '@/apis/authApi'
import NotificationItem, { NotificationItemProps } from '@/components/NotificationItem/NotificationItem'
import { Setting, User } from '@/data/types'
import { useCustomMutation } from '@/hooks/useCustomMutation'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import { set } from 'lodash'
import React, { useEffect, useState } from 'react'
const Notification = ({ user }: { user: User }) => {
    console.log(user)
    const { data: settings } = useCustomQuery({ key: "settings" });
    console.log(settings);
    const { mutate } = useCustomMutation({ key: "users", type: "update", id: user.id, queryKey: "users/me", paramObj: AuthApi.getMeParams() })
    const [settingsData, setSettingsData] = useState<Setting[]>(user.settings);
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