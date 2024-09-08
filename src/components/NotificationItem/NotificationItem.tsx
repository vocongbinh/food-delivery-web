import React, { FC, useState } from 'react'
import Button from '../Button/Button';
import { Switch } from 'antd';
import { Setting } from '@/data/types';
export interface NotificationItemProps {
   setting: Setting;
   data: Setting[];
   setData: (data: Setting[]) => void;

}
const NotificationItem: FC<NotificationItemProps> = ({ setting, data, setData }) => {
    const {name, description} = setting;
    const handleChange = (checked: boolean) => {
        if(checked) {
            setData([...data, setting]);
        }
        else {
            setData(data.filter(item => item.key !== setting.key))
        }
    }
    return (
        <div className='flex justify-between'>
            <div>
                <h2 className='text-sm font-semibold'>{name}</h2>
                <h2 className="text-neutral-500 text-sm">{description}</h2>
            </div>
            <Switch checked={data.map(item=> item.key).includes(setting.key)} onChange={handleChange} />
        </div>
    )
}

export default NotificationItem