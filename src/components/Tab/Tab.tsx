import { FC, ReactNode, useState } from 'react';
interface TabProps {
    title: string;
    icon?: ReactNode;
    active: boolean;
    onClick: () => void;
    activeClassName?: string;
    sizeClassName?: string;
}

const Tab: FC<TabProps> = ({ title, icon, active, onClick, activeClassName = "bg-white text-black", sizeClassName = "px-6 py-1" }) => {
    return (
        <button
            className={`rounded-xl text-base
        ${active ? activeClassName : 'hover:bg-neutral-100 text-neutral-500'}
        ${sizeClassName}
        `}
            onClick={onClick}
        >
            {icon || <></>}
            {title}
        </button>
    );
}

export default Tab;