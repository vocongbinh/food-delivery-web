"use client"
import { Avatar, List, Skeleton, Switch } from 'antd';
export default function DishLoadingPlaceholder({ Imgstyle = {}, inputStyle = {} }: { Imgstyle?: React.CSSProperties, inputStyle?: React.CSSProperties }) {
  return (
    <div className='flex flex-col w-full gap-4'>
      <Skeleton.Image active={true} style={Imgstyle} />
      <Skeleton.Input active={true} style={inputStyle} />
    </div>
  );
}