import React, { useState } from 'react'
import Button from '../Button/Button'
import Image from 'next/image'
import { useInformationContext } from '@/contexts/information/information-context'
export default function Gender() {
  const { information, handleChangeInformation } = useInformationContext()
  const [gender, setGender] = useState<string>(information.gender)
  const handleSelectGender = (value: string) => {
    setGender(value)
    handleChangeInformation("gender", value)
  }
  const buttonStyle = "flex flex-1 flex-col items-center gap-5 !rounded-3xl !text-xl"

  return (
    <div className="flex flex-col justify-around gap-8">
      <span className='text-3xl dark:text-white text-cyan-950 font-semibold text-center'>What is your gender ? 🧑‍🤝‍🧑</span>
      <div className='flex md:gap-10 gap-8 justify-between mt-16'>
        <Button onClick={() => handleSelectGender("male")} className={`${buttonStyle} ${gender == "male" ? '!bg-blue-400 !hover:none !text-white' : ""}`} pattern='male'>
          <Image alt="" src="/icons/male.svg" width={100} height={100} />
          <span>Male</span>
        </Button>
        <Button onClick={() => handleSelectGender("female")} className={`${buttonStyle} !py-8 ${gender == "female" ? '!bg-pink-400 !hover:none !text-white' : ""}`} pattern='female'>
          <Image alt="" src="/icons/female.svg" width={100} height={100} />
          <span>Female</span>
        </Button>
      </div>
    </div>

  )
}
