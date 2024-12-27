import Image from 'next/image'
import React from 'react'
import ButtonPrimary from '../Button/ButtonPrimary'
import RecommendSpinner from '../RecommendSpinner/RecommendSpinner'

export default function Splash1({ className, onClick }: { className?: string, onClick: () => void }) {
    return (
        <div className={`flex flex-col h-full justify-around gap-4 rounded-2xl" ${className}`}>
            <div className="flex items-start gap-4">
                <span style={{ wordSpacing: 1 }} className='text-3xl dark:text-white text-cyan-950 font-semibold text-left w-[60%]'>💪Let us accompany you on your journey to build a healthier diet! 🍲 🥗 🍱</span>
                <div className='relative w-full aspect-h-1 aspect-w-2'>
                    <Image src="/splash1.svg" alt="food1" fill className='object-cover' unoptimized={true} />
                </div>
            </div>
            <ButtonPrimary onClick={onClick} className="rounded-md mt-14">Getting started 🔥</ButtonPrimary>
        </div>
    )
}
