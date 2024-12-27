import React, { useState } from 'react'
import Button from '../Button/Button'
import Image from 'next/image'
import { useInformationContext } from '@/contexts/information/information-context'
import { Slider } from '@mui/material'
export default function Age() {
  const { information, setInformation, handleChangeInformation } = useInformationContext()
  const getAgeValue = (value: number) => value.toString()
  return (
    <div className="flex flex-col justify-around gap-8 items-center">
      <span className='text-3xl dark:text-white text-cyan-950 font-semibold text-center'>What is your Age ? 🧑🧑🏻‍🤝‍🧑🏻</span>
      <Image src="/icons/age.svg" alt="" width={200} height={200}/>
      <div className="px-6 w-full">
      <Slider
              aria-label="age"
              size="medium"
              defaultValue={18}
              getAriaValueText={getAgeValue}
              valueLabelDisplay="auto"
              step={1}
              max={70}
              min={14}
              onChange={(e, value) => {
                handleChangeInformation(
                  "age",
                    Number(value)
                );
              }}
            /> 
      </div>
           
     
    </div>

  )
}
